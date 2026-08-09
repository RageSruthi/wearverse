// src/VirtualTryOn.jsx
import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useStore } from "./StoreContext";

export default function VirtualTryOn({ activeProduct, onClose }) {
  const { cart, recentlyViewed, addToCart } = useStore();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  const fallbackOutfit = {
    id: "try-default-1",
    title: "Floral Summer Frock",
    price: 899,
    category: "Dresses",
    color: "#e88aa5",
    darkColor: "#b84f72",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
  };

  const [selectedItem, setSelectedItem] = useState(activeProduct || cart[0] || fallbackOutfit);
  const [humanDetected, setHumanDetected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Initializing camera & AI person detector...");

  const outfitsList = [
    ...(activeProduct ? [activeProduct] : []),
    ...cart,
    ...recentlyViewed,
    fallbackOutfit,
  ].filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        if (active) {
          setLoading(true);
          setMessage("Loading COCO-SSD human detection model...");
        }

        if (!modelRef.current) {
          modelRef.current = await cocoSsd.load();
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        if (active) {
          setLoading(false);
          setMessage("Camera ready. Stand in front of the camera.");
          detectHuman();
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setLoading(false);
          setMessage("Camera permission was denied or camera is unavailable.");
        }
      }
    }

    init();

    return () => {
      active = false;
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }

  async function detectHuman() {
    if (!videoRef.current || !modelRef.current) return;

    if (videoRef.current.readyState !== 4) {
      animationRef.current = requestAnimationFrame(detectHuman);
      return;
    }

    try {
      const predictions = await modelRef.current.detect(videoRef.current);
      const people = predictions.filter((p) => p.class === "person" && p.score >= 0.5);

      if (people.length > 0) {
        setHumanDetected(true);
        setMessage("Human detected — Virtual Outfit Overlay Active!");
        drawOutfitOverlay(people[0].bbox);
      } else {
        setHumanDetected(false);
        setMessage("Looking for person... Please stand in camera view.");
        clearCanvas();
      }
    } catch (err) {
      console.error(err);
    }

    animationRef.current = requestAnimationFrame(detectHuman);
  }

  function clearCanvas() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function drawOutfitOverlay(bbox) {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !selectedItem) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const personX = bbox[0];
    const personY = bbox[1];
    const personWidth = bbox[2];
    const personHeight = bbox[3];

    const scaleX = personWidth / 250;
    const scaleY = personHeight / 500;
    const dressWidth = 250 * scaleX;
    const dressHeight = 320 * scaleY;
    const dressX = personX + (personWidth - dressWidth) / 2;
    const dressY = personY + personHeight * 0.18;

    ctx.save();
    ctx.globalAlpha = 0.88;

    // Draw stylized outfit shape with dynamic color based on item
    const themeColor = selectedItem.color === "Black" ? "#222" : selectedItem.color === "Blue" ? "#3b82f6" : selectedItem.color === "Red" ? "#ef4444" : "#10b981";

    ctx.beginPath();
    ctx.moveTo(dressX + dressWidth * 0.3, dressY);
    ctx.lineTo(dressX + dressWidth * 0.7, dressY);
    ctx.lineTo(dressX + dressWidth * 0.92, dressY + dressHeight * 0.15);
    ctx.lineTo(dressX + dressWidth * 0.8, dressY + dressHeight);
    ctx.lineTo(dressX + dressWidth * 0.2, dressY + dressHeight);
    ctx.lineTo(dressX + dressWidth * 0.08, dressY + dressHeight * 0.15);
    ctx.closePath();

    ctx.fillStyle = themeColor;
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Neckline & accent waist line
    ctx.beginPath();
    ctx.arc(dressX + dressWidth * 0.5, dressY + dressHeight * 0.03, dressWidth * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.restore();
  }

  return (
    <div className="modal-overlay">
      <div className="tryon-modal-box">
        <div className="tryon-modal-header">
          <div>
            <span className="aiLabel">✨ AI VIRTUAL TRY-ON</span>
            <h2>{selectedItem?.title || "Virtual Outfit"}</h2>
            <p>Stand in front of the camera. TensorFlow.js tracks person position and overlays outfit matrix.</p>
          </div>
          <button
            className="close"
            onClick={() => {
              stopCamera();
              if (onClose) onClose();
            }}
          >
            ×
          </button>
        </div>

        {/* Camera Box */}
        <div className="cameraBox">
          <video ref={videoRef} className="video" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="canvas" />

          <div className={humanDetected ? "status human" : "status"}>
            <span className="statusDot"></span>
            {loading ? "Loading AI models..." : humanDetected ? "Human Detected — Outfit Tracking Live" : "Looking for person..."}
          </div>

          {!humanDetected && !loading && (
            <div className="cameraMessage">
              <div className="personIcon">👤</div>
              <strong>Stand in Front of Camera</strong>
              <p>Make sure upper body & shoulders are clearly visible.</p>
            </div>
          )}
        </div>

        {/* Outfit Switcher Row */}
        <div className="switchArea">
          <div className="switchTitle">Switch Outfit to Try On:</div>
          <div className="miniList">
            {outfitsList.map((item) => (
              <button
                key={item.id}
                className={`mini ${selectedItem?.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={item.title} className="mini-item-img" />
                <span className="miniName">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="tryon-modal-footer">
          <span className="bottomMessage">{message}</span>
          <button
            className="sell-primary"
            onClick={() => {
              addToCart(selectedItem);
              alert(`"${selectedItem.title}" added to cart!`);
            }}
          >
            🛒 Add Outfit to Cart (₹{selectedItem.price})
          </button>
        </div>
      </div>
    </div>
  );
}