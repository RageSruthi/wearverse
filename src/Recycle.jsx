// src/Recycle.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function Recycle({ setPage }) {
  const { recycleRequests, createRecycleRequest } = useStore();

  const [step, setStep] = useState("browse"); // 'browse' | 'form' | 'success'
  const [lastReq, setLastReq] = useState(null);

  const [form, setForm] = useState(() => ({
    title: "Damaged Cotton T-Shirt & Fabric Scraps",
    category: "T-Shirts",
    condition: "Severely Damaged",
    destination: "Agricultural Use",
    pickupDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    address: "123 Eco Fashion Avenue, Bandra West, Mumbai - 400050",
  }));

  function handleSubmitRequest(e) {
    e.preventDefault();
    const req = createRecycleRequest(form);
    setLastReq(req);
    setStep("success");
  }

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">CIRCULAR FASHION RECYCLING</span>
        <h1>Responsible Textile Recycling & Reuse</h1>
        <p>Items too damaged for resale or rental land here. WearVerse routes these to donation drives or agricultural reuse (crop protection & mulch).</p>
      </div>

      {/* Top Banner CTA */}
      <div className="recycle-cta-banner">
        <div>
          <h2>♻️ Have Damaged Clothes? Don't Throw Them in Landfills</h2>
          <p>Schedule a free doorstep pickup. We grade fabrics and route them for donation, fiber recycling, or agricultural crop protection.</p>
        </div>
        <button className="sell-primary" onClick={() => setStep("form")}>
          + Schedule Free Recycle Pickup
        </button>
      </div>

      {/* Pickup Request Modal / Form */}
      {step === "form" && (
        <div className="modal-overlay" onClick={() => setStep("browse")}>
          <div className="recycle-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setStep("browse")}>×</button>
            <div className="recycle-header">
              <span className="label">FREE DOORSTEP PICKUP</span>
              <h2>Schedule Clothing Recycle Request</h2>
            </div>

            <form onSubmit={handleSubmitRequest} className="recycle-form-grid">
              <label>
                Garment Description
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </label>

              <div className="form-row-2">
                <label>
                  Condition
                  <select
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  >
                    <option>Severely Damaged</option>
                    <option>Slightly Damaged</option>
                    <option>Old & Worn Out</option>
                  </select>
                </label>

                <label>
                  Recycling Destination
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  >
                    <option value="Donate">Donate to NGO / Clothing Drive</option>
                    <option value="Recycle">Textile Fiber Shredding & Recycling</option>
                    <option value="Agricultural Use">Agricultural Use (Crop Covering & Mulch)</option>
                    <option value="Upcycle">Upcycle Studio (Artisan Crafting)</option>
                  </select>
                </label>
              </div>

              <label>
                Pickup Date
                <input
                  type="date"
                  required
                  value={form.pickupDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                />
              </label>

              <label>
                Pickup Address
                <textarea
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </label>

              <button type="submit" className="sell-primary full-width">
                Confirm Free Doorstep Pickup →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success State */}
      {step === "success" && lastReq && (
        <div className="modal-overlay">
          <div className="recycle-modal-card success-card">
            <div className="success-icon">✓</div>
            <h2>Recycle Request #{lastReq.id} Submitted!</h2>
            <p>Our logistics partner will collect your garment on <strong>{lastReq.pickupDate}</strong>.</p>
            <p>Target Destination: <strong>{lastReq.destination}</strong></p>

            <div className="success-actions" style={{ marginTop: 24 }}>
              <button
                className="sell-primary full-width"
                onClick={() => {
                  setStep("browse");
                  if (setPage) setPage("Dashboard");
                }}
              >
                View Tracking in Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Recycle Queue Showcase */}
      <h2 className="section-subheading" style={{ marginTop: 32 }}>Recycle Queue & Recent Requests ({recycleRequests.length})</h2>
      {recycleRequests.length === 0 ? (
        <p className="empty-note">No active recycle requests. Schedule one using the button above!</p>
      ) : (
        <div className="recycle-requests-grid">
          {recycleRequests.map((item) => (
            <div className="recycle-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="recycle-info">
                <h3>Request #{item.id}</h3>
                <p>Garment: {item.title}</p>
                <p>Destination: <strong>{item.destination}</strong></p>
                <p>Pickup Date: {item.pickupDate}</p>
              </div>
              <span className="status-pill mode-rent">{item.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
