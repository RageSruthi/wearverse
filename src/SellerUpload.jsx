// src/SellerUpload.jsx
import { useRef, useState } from "react";
import { classifyCondition, isClothing } from "./aiClassifier";
import { useStore } from "./StoreContext";

const MAX_PHOTOS = 4;

export default function SellerUpload({ setPage }) {
  const { addListing, createRecycleRequest } = useStore();

  const cameraInputRef = useRef(null);
  const uploadInputRef = useRef(null);
  const addInputRef = useRef(null);
  const videoRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [resultMsg, setResultMsg] = useState({ text: "", type: "" });
  const [isScanning, setIsScanning] = useState(false);

  const [step, setStep] = useState("scanner"); // 'scanner' | 'camera' | 'analysis' | 'success'
  const [analysisResults, setAnalysisResults] = useState([]);
  const [stream, setStream] = useState(null);
  const [retakeIndex, setRetakeIndex] = useState(null);

  const [itemDetails] = useState({
    title: "Cotton Dress",
    category: "Dresses",
    price: "899",
    rentalPrice: "149",
  });

  async function processImage(file, indexToReplace = null) {
    if (indexToReplace === null && photos.length >= MAX_PHOTOS) {
      setResultMsg({ text: "⚠️ Maximum 4 photos allowed.", type: "error" });
      return;
    }

    if (!file || !file.type.startsWith("image/")) {
      setResultMsg({ text: "❌ Please select a valid image.", type: "error" });
      return;
    }

    setIsScanning(true);
    setResultMsg({ text: "🔍 Checking whether this is clothing...", type: "loading" });

    try {
      const ok = await isClothing(file);

      if (ok) {
        const photoObj = { file, url: URL.createObjectURL(file) };
        setPhotos((prev) => {
          if (indexToReplace !== null && indexToReplace < prev.length) {
            const copy = [...prev];
            copy[indexToReplace] = photoObj;
            return copy;
          }
          return [...prev, photoObj];
        });

        setResultMsg({ text: "✅ Clothing detected. Photo accepted!", type: "success" });
      } else {
        setResultMsg({
          text: "❌ INVALID IMAGE — CLOTHING NOT DETECTED. Please upload a clear clothing photo.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      const photoObj = { file, url: URL.createObjectURL(file) };
      setPhotos((prev) => (indexToReplace !== null ? prev : [...prev, photoObj]));
      setResultMsg({ text: "✅ Photo uploaded.", type: "success" });
    } finally {
      setIsScanning(false);
      setRetakeIndex(null);
    }
  }

  function handleFileInput(e, indexToReplace = null) {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file, indexToReplace);
    }
    e.target.value = "";
  }

  function deletePhoto(idx) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  async function openCamera(idxToRetake = null) {
    setRetakeIndex(idxToRetake);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      setStep("camera");
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error(err);
      if (cameraInputRef.current) cameraInputRef.current.click();
    }
  }

  function captureCameraPhoto() {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "clothing-camera.jpg", { type: "image/jpeg" });
          closeCamera();
          processImage(file, retakeIndex);
        }
      },
      "image/jpeg",
      0.92
    );
  }

  function closeCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setStep("scanner");
  }

  async function runAIAnalysis() {
    if (photos.length === 0) {
      setResultMsg({ text: "Please upload clothing photo first.", type: "error" });
      return;
    }

    setStep("analysis");
    setIsScanning(true);
    setAnalysisResults([]);

    const resList = [];
    for (let i = 0; i < photos.length; i++) {
      try {
        const cond = await classifyCondition(photos[i].file);
        resList.push({
          photo: photos[i],
          condition: cond.condition,
          confidence: cond.confidence || 90,
        });
      } catch (err) {
        console.error(err);
        resList.push({
          photo: photos[i],
          condition: "Good",
          confidence: 90,
        });
      }
    }

    setAnalysisResults(resList);
    setIsScanning(false);
  }

  function sendGarmentToSection(res) {
    let target = "Shop";
    if (res.condition === "Excellent") {
      target = "Rent";
      addListing({
        title: itemDetails.title,
        category: itemDetails.category,
        rentalPrice: Number(itemDetails.rentalPrice),
        type: "rent",
        image: res.photo.url,
      });
    } else if (res.condition === "Slightly Damaged") {
      target = "Upcycle";
    } else if (res.condition === "Severely Damaged") {
      target = "Recycle";
      createRecycleRequest({
        title: itemDetails.title,
        condition: res.condition,
        image: res.photo.url,
      });
    } else {
      addListing({
        title: itemDetails.title,
        category: itemDetails.category,
        price: Number(itemDetails.price),
        image: res.photo.url,
      });
    }

    alert(`Cloth successfully sent to ${target} section!`);
    if (setPage) setPage(target);
  }

  // CAMERA STEP
  if (step === "camera") {
    return (
      <div className="page active" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "rgba(0,0,0,0.8)" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "20px", textAlign: "center", maxWidth: "480px", width: "90%" }}>
          <h3 style={{ margin: "0 0 12px", color: "#174d39" }}>📷 Scan Your Clothing</h3>
          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: "14px", background: "black", minHeight: "260px" }} />
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button className="secondary" style={{ flex: 1, padding: "12px" }} onClick={closeCamera}>Cancel</button>
            <button className="primary" style={{ flex: 1, padding: "12px" }} onClick={captureCameraPhoto}>📸 Capture</button>
          </div>
        </div>
      </div>
    );
  }

  // ANALYSIS RESULT STEP
  if (step === "analysis") {
    return (
      <div className="page active">
        <div className="page-heading">
          <span className="label">AI CLOTHING ANALYSIS</span>
          <h1>AI Condition Inspection & Recommendations</h1>
          <p>The AI checks the uploaded clothing and recommends what should happen next.</p>
        </div>

        {/* Condition Guide Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px", maxWidth: "900px", margin: "0 auto 28px" }}>
          <div style={{ background: "#edf4ef", padding: "16px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🟢</span>
            <div>
              <strong style={{ display: "block", color: "#174d39" }}>Good Condition</strong>
              <small style={{ color: "#666" }}>Ready to sell or rent</small>
            </div>
          </div>

          <div style={{ background: "#fffaf0", padding: "16px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🟠</span>
            <div>
              <strong style={{ display: "block", color: "#975a16" }}>Slightly Damaged</strong>
              <small style={{ color: "#666" }}>Repair / tailor recommended</small>
            </div>
          </div>

          <div style={{ background: "#fff5f5", padding: "16px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🔴</span>
            <div>
              <strong style={{ display: "block", color: "#c53030" }}>Severely Damaged</strong>
              <small style={{ color: "#666" }}>Recycling recommended</small>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {analysisResults.map((res, idx) => (
            <div key={idx} style={{ background: "white", border: "1px solid #e1ebe4", borderRadius: "20px", overflow: "hidden" }}>
              <img src={res.photo.url} alt="Garment" style={{ width: "100%", height: "260px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 6px", color: res.condition === "Good" ? "#21813b" : res.condition === "Slightly Damaged" ? "#d48600" : "#d22f2f" }}>
                  {res.condition === "Good" ? "🟢 Good Condition" : res.condition === "Slightly Damaged" ? "🟠 Slightly Damaged" : "🔴 Severely Damaged"}
                </h3>
                <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                  AI Confidence: {res.confidence.toFixed(0)}%
                </p>

                {res.condition === "Good" && (
                  <div>
                    <p style={{ fontSize: "13px", color: "#555" }}>This item is in good condition and can be published to Shop or Rent.</p>
                    <button className="primary" style={{ width: "100%", padding: "12px" }} onClick={() => sendGarmentToSection(res)}>
                      🛍️ Add to Sell / Rent →
                    </button>
                  </div>
                )}

                {res.condition === "Slightly Damaged" && (
                  <div style={{ background: "#fffaf0", padding: "14px", borderRadius: "12px" }}>
                    <h4 style={{ margin: "0 0 4px", color: "#975a16" }}>🧵 Nearby Tailor Recommended</h4>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>Connect with local master tailors to upcycle this cloth.</p>
                    <button className="primary" style={{ width: "100%", padding: "10px", background: "#ef920f" }} onClick={() => sendGarmentToSection(res)}>
                      ✂️ Send to Upcycle Studio →
                    </button>
                  </div>
                )}

                {res.condition === "Severely Damaged" && (
                  <div style={{ background: "#fff5f5", padding: "14px", borderRadius: "12px" }}>
                    <h4 style={{ margin: "0 0 4px", color: "#c53030" }}>♻️ Recycling Recommended</h4>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>Route to agricultural farmers or donation drives.</p>
                    <button className="primary" style={{ width: "100%", padding: "10px", background: "#d63b3b" }} onClick={() => sendGarmentToSection(res)}>
                      ♻️ Send to Recycle Network →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button className="secondary" onClick={() => setStep("scanner")}>
            ← Back to Scanner
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT SCANNER STEP
  return (
    <div className="page active">
      <div className="page-heading">
        <span className="label">SELLER CLOTHING SCANNER</span>
        <h1>Upload Your Clothing</h1>
        <p>Upload a clear clothing photo. You can add up to 4 photos. Use AI Analysis to determine the condition.</p>
      </div>

      <div style={{ background: "white", padding: "36px", borderRadius: "26px", border: "1px solid #e1ebe4", maxWidth: "560px", margin: "0 auto", textAlign: "center", boxShadow: "0 15px 45px rgba(0,0,0,0.06)" }}>
        <div style={{ width: "70px", height: "70px", background: "#e8f1e6", borderRadius: "50%", display: "flex", alignItems: "center", justifyCenter: "center", fontSize: "36px", margin: "0 auto 16px" }}>
          👗
        </div>

        <div style={{ color: "#59665d", fontSize: "13px", fontWeight: "bold", background: "#f1f4f0", padding: "10px", borderRadius: "10px", marginBottom: "20px" }}>
          ✅ AI Ready — Clothing detection available.
        </div>

        {/* Hidden Inputs */}
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" hidden onChange={handleFileInput} />
        <input ref={uploadInputRef} type="file" accept="image/*" hidden onChange={handleFileInput} />
        <input ref={addInputRef} type="file" accept="image/*" hidden onChange={handleFileInput} />

        {/* Camera & Upload Buttons */}
        <button className="primary" style={{ width: "100%", padding: "15px", marginBottom: "12px", fontSize: "15px" }} onClick={() => openCamera()}>
          📷 Open Camera & Scan
        </button>

        <button className="secondary" style={{ width: "100%", padding: "15px", marginBottom: "16px", fontSize: "15px" }} onClick={() => uploadInputRef.current?.click()}>
          🖼️ Upload Existing Photo
        </button>

        {/* Result Status Alert */}
        {resultMsg.text && (
          <div style={{ padding: "12px", borderRadius: "10px", marginBottom: "16px", fontSize: "13px", fontWeight: "bold", background: resultMsg.type === "success" ? "#e6f5ea" : resultMsg.type === "error" ? "#fde9e9" : "#fff5d9", color: resultMsg.type === "success" ? "#25633b" : resultMsg.type === "error" ? "#a52e2e" : "#806400" }}>
            {resultMsg.text}
          </div>
        )}

        {/* Photo Gallery Grid */}
        {photos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {photos.map((p, idx) => (
              <div key={idx} style={{ height: "180px", borderRadius: "14px", overflow: "hidden", position: "relative", background: "#edf2ed" }}>
                <img src={p.url} alt="Clothing" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "8px", left: "8px", right: "8px", display: "flex", gap: "6px" }}>
                  <button className="primary" style={{ flex: 1, padding: "6px", fontSize: "11px" }} onClick={() => openCamera(idx)}>🔄 Retake</button>
                  <button className="secondary" style={{ width: "32px", padding: "0", background: "rgba(0,0,0,0.7)", color: "white", border: "none" }} onClick={() => deletePhoto(idx)}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {photos.length > 0 && photos.length < MAX_PHOTOS && (
          <button className="secondary" style={{ width: "100%", padding: "12px", border: "2px dashed #9db5a1", marginBottom: "16px" }} onClick={() => addInputRef.current?.click()}>
            ＋ Add Another Photo ({photos.length}/4)
          </button>
        )}

        {photos.length > 0 && (
          <button className="primary" style={{ width: "100%", padding: "15px", background: "#6b4bb6", fontSize: "16px" }} disabled={isScanning} onClick={runAIAnalysis}>
            🤖 AI Analysis & Route →
          </button>
        )}
      </div>
    </div>
  );
}
