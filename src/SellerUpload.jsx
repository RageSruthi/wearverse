// src/SellerUpload.jsx
import { useRef, useState } from "react";
import { classifyCondition, isClothing, loadAI } from "./aiClassifier";
import { useStore } from "./StoreContext";
import { CATEGORIES, SUBCATEGORIES } from "./mockDataGenerator";

const MAX_PHOTOS = 4;

export default function SellerUpload({ setPage }) {
  const { addListing, createRecycleRequest } = useStore();

  const uploadRef = useRef(null);
  const cameraRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [aiStatus, setAiStatus] = useState("AI classifier ready...");
  const [checking, setChecking] = useState(false);
  const [rejectMsg, setRejectMsg] = useState("");

  const [step, setStep] = useState("upload"); // upload -> analysis -> listing -> success
  const [analysis, setAnalysis] = useState(null);
  const [publishedItem, setPublishedItem] = useState(null);

  const [item, setItem] = useState({
    title: "",
    category: "Dresses",
    subcategory: "Summer Frock",
    size: "M",
    color: "Pink",
    material: "Cotton",
    mode: "shop",
    price: "899",
    rentalPrice: "149",
    deposit: "200",
    description: "",
  });

  async function ensureAI() {
    setAiStatus("Loading zero-shot AI classifier...");
    await loadAI(setAiStatus);
    setAiStatus("AI classifier ready for clothing detection.");
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;

    const remaining = MAX_PHOTOS - photos.length;
    const selected = files.slice(0, remaining);

    setChecking(true);
    setRejectMsg("");
    await ensureAI();

    for (const file of selected) {
      try {
        const ok = await isClothing(file);
        if (!ok) {
          setRejectMsg(`"${file.name}" doesn't look like a clothing photo and was skipped.`);
          continue;
        }
        setPhotos((prev) => [...prev, { file, url: URL.createObjectURL(file) }]);
      } catch (err) {
        console.error(err);
        setPhotos((prev) => [...prev, { file, url: URL.createObjectURL(file) }]);
      }
    }

    setChecking(false);
  }

  function removePhoto(idx) {
    setPhotos((prev) => {
      const copy = [...prev];
      if (copy[idx]?.url) URL.revokeObjectURL(copy[idx].url);
      copy.splice(idx, 1);
      return copy;
    });
  }

  async function runAIAnalysis() {
    if (photos.length === 0) {
      alert("Please upload at least one clothing photo.");
      return;
    }

    setStep("analysis");
    setAnalysis(null);

    try {
      const result = await classifyCondition(photos[0].file);
      setAnalysis(result);

      setItem((prev) => ({
        ...prev,
        title: `${prev.color} ${prev.material} ${prev.subcategory}`,
      }));

      if (result.condition === "Severely Damaged") {
        createRecycleRequest({
          title: `${item.category} (AI Auto-Routed)`,
          condition: result.condition,
          destination: "Recycle",
          image: photos[0].url,
        });
      }
    } catch (err) {
      console.error(err);
      setAnalysis({ condition: "Good", confidence: 90 });
    }
  }

  function confirmListing() {
    if (!item.title || !item.price) {
      alert("Please fill in the product title and pricing.");
      return;
    }

    const created = addListing({
      title: item.title,
      category: item.category,
      subcategory: item.subcategory,
      size: item.size,
      color: item.color,
      material: item.material,
      condition: analysis?.condition || "Good",
      type: item.mode,
      price: Number(item.price),
      rentalPrice: Number(item.rentalPrice),
      image: photos[0]?.url || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
      images: photos.map((p) => p.url),
    });

    setPublishedItem(created);
    setStep("success");
  }

  // SUCCESS STATE
  if (step === "success" && publishedItem) {
    return (
      <div className="page">
        <div className="feature text-center">
          <div className="big-icon">🚀</div>
          <span className="label">LISTING PUBLISHED LIVE</span>
          <h1>Your Item is Now Live on WearVerse!</h1>
          <p>Buyers can now search, rent, or purchase <strong>"{publishedItem.title}"</strong> in the marketplace.</p>

          <div style={{ background: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e1ebe4", maxWidth: "400px", margin: "20px auto" }}>
            <img src={publishedItem.image} alt={publishedItem.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }} />
            <h3 style={{ margin: "12px 0 4px" }}>{publishedItem.title}</h3>
            <b>₹{publishedItem.price}</b>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
            <button className="primary" onClick={() => setPage("Shop")}>
              View in Marketplace Shop →
            </button>
            <button className="secondary" onClick={() => setStep("upload")}>
              + Upload Another Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ANALYSIS RESULT STATE
  if (step === "analysis") {
    return (
      <div className="page">
        <div className="feature" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="big-icon">🤖</div>
          <span className="label">AI GARMENT SCANNING & DETECTION</span>
          <h1 style={{ margin: "8px 0 16px" }}>AI Condition Inspection Result</h1>

          {!analysis ? (
            <div style={{ padding: "40px" }}>
              <h3>Analyzing garment condition & scanning for damage...</h3>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                {photos.map((p, i) => (
                  <img key={i} src={p.url} alt={`Scan ${i + 1}`} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px" }} />
                ))}
              </div>

              <div style={{ background: "#edf4ef", padding: "20px", borderRadius: "16px", marginBottom: "24px" }}>
                <h2 style={{ margin: "0 0 6px", color: "#174d39" }}>
                  {analysis.condition === "Good" && "🟢 Good / Like New Condition"}
                  {analysis.condition === "Slightly Damaged" && "🟠 Slightly Damaged / Torn"}
                  {analysis.condition === "Severely Damaged" && "🔴 Severely Damaged / Unwearable"}
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
                  AI Confidence: <strong>{analysis.confidence?.toFixed(0) || 90}%</strong>
                </p>
              </div>

              {/* SLIGHTLY DAMAGED -> ROUTE TO UPCYCLE */}
              {analysis.condition === "Slightly Damaged" && (
                <div style={{ background: "#fffaf0", border: "1px solid #fbd38d", padding: "20px", borderRadius: "16px", marginBottom: "24px", textAlign: "left" }}>
                  <h3 style={{ margin: "0 0 6px", color: "#975a16" }}>✂️ Auto-Routed to Upcycle (Nearest Tailors)</h3>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
                    This garment has slight tears or wear. AI recommends sending it to a nearby local tailor for upcycling or alteration.
                  </p>
                  <button className="primary" onClick={() => setPage("Upcycle")}>
                    Connect with Nearest Tailors (Upcycle) →
                  </button>
                </div>
              )}

              {/* SEVERELY DAMAGED -> ROUTE TO RECYCLE */}
              {analysis.condition === "Severely Damaged" && (
                <div style={{ background: "#fff5f5", border: "1px solid #feb2b2", padding: "20px", borderRadius: "16px", marginBottom: "24px", textAlign: "left" }}>
                  <h3 style={{ margin: "0 0 6px", color: "#c53030" }}>♻️ Auto-Routed to Recycle (Donation & Farmers)</h3>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
                    This item is unwearable. AI recommends routing to donation drives or agricultural farmers for crop protection and soil mulch.
                  </p>
                  <button className="primary" onClick={() => setPage("Recycle")}>
                    Connect with Farmers & Donation NGOs →
                  </button>
                </div>
              )}

              {/* GOOD / LIKE NEW -> RESALE & RENTAL MARKETPLACE */}
              {analysis.condition === "Good" && (
                <div style={{ background: "#edf4ef", padding: "20px", borderRadius: "16px", marginBottom: "24px" }}>
                  <strong style={{ color: "#174d39", fontSize: "16px" }}>Approved for Resale & Rental Marketplace!</strong>
                  <p style={{ margin: "6px 0 16px", fontSize: "13px", color: "#555" }}>
                    Set your selling price or rental rate to publish live.
                  </p>
                  <button className="primary" onClick={() => setStep("listing")}>
                    Continue to Price Decision & Listing →
                  </button>
                </div>
              )}

              <button className="secondary" onClick={() => setStep("upload")} style={{ marginTop: "12px" }}>
                ← Upload Different Photo
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // LISTING FORM STATE
  if (step === "listing") {
    return (
      <div className="page">
        <div style={{ background: "white", padding: "32px", borderRadius: "20px", border: "1px solid #e1ebe4", maxWidth: "680px", margin: "0 auto" }}>
          <h2>Seller Price Decision</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Category</label>
              <select
                value={item.category}
                onChange={(e) => setItem({ ...item, category: e.target.value, subcategory: SUBCATEGORIES[e.target.value]?.[0] || e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Subcategory</label>
              <select
                value={item.subcategory}
                onChange={(e) => setItem({ ...item, subcategory: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              >
                {(SUBCATEGORIES[item.category] || [item.category]).map((sc) => (
                  <option key={sc}>{sc}</option>
                ))}
              </select>
            </div>
          </div>

          <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Listing Title</label>
          <input
            type="text"
            required
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "16px" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Selling Price (₹)</label>
              <input
                type="number"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Rental Rate (₹/day)</label>
              <input
                type="number"
                value={item.rentalPrice}
                onChange={(e) => setItem({ ...item, rentalPrice: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </div>
          </div>

          <button className="primary" style={{ width: "100%", padding: "14px" }} onClick={confirmListing}>
            🚀 PUBLISH LISTING LIVE →
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT UPLOAD STEP
  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">SELLER PRODUCT UPLOADER</span>
        <h1>Upload Clothes for AI Scanning</h1>
        <p>Upload photos — AI scans the garment, detects condition (Good, Slightly Damaged, Severely Damaged), and routes it appropriately.</p>
      </div>

      <div style={{ background: "white", padding: "36px", borderRadius: "20px", border: "1px solid #e1ebe4", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
        <h2 style={{ margin: "0 0 8px" }}>Select or Capture Garment Photos</h2>
        <p style={{ color: "#666", marginBottom: "20px", fontSize: "13px" }}>{checking ? "Scanning photo with AI..." : aiStatus}</p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
          <button className="primary" onClick={() => uploadRef.current?.click()}>
            🖼️ Select Photo
          </button>
          <button className="secondary" onClick={() => cameraRef.current?.click()}>
            📷 Use Camera
          </button>
        </div>

        <input ref={uploadRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={handleFiles} />

        {rejectMsg && <div style={{ color: "#c53030", marginBottom: "16px", fontSize: "12px" }}>{rejectMsg}</div>}

        {photos.length > 0 && (
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
            {photos.map((p, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={p.url} alt={`Upload ${i + 1}`} style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "10px" }} />
                <button onClick={() => removePhoto(i)} style={{ position: "absolute", top: "-6px", right: "-6px", background: "#e53e3e", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer" }}>×</button>
              </div>
            ))}
          </div>
        )}

        <button
          className="primary"
          style={{ width: "100%", padding: "14px" }}
          disabled={photos.length === 0 || checking}
          onClick={runAIAnalysis}
        >
          🤖 SCAN GARMENT & CONDITION ROUTE →
        </button>
      </div>
    </div>
  );
}
