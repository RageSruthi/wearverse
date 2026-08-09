// src/Upcycle.jsx
import { useState } from "react";

export default function Upcycle() {
  const [assignedTailor, setAssignedTailor] = useState(null);

  const nearestTailors = [
    {
      id: "tailor-1",
      name: "Masterji Crafts & Alterations Studio",
      artisan: "Master Ramesh Kumar",
      phone: "+91 98123 45678",
      address: "Shop 14, Linking Road, Bandra West, Mumbai - 400050",
      distance: "1.2 km away",
      specialty: "Repairs torn denim, converts old sarees to tote bags & jackets",
      rating: "4.9 ★",
      badge: "VERIFIED MASTER TAILOR",
    },
    {
      id: "tailor-2",
      name: "Kala Artisan Tailoring Collective",
      artisan: "Sunita Devi",
      phone: "+91 97654 89012",
      address: "Plot 42, Commercial Complex, Dadar West, Mumbai - 400028",
      distance: "2.5 km away",
      specialty: "Embroidery, patchwork cushions, upcycled ethnic jackets",
      rating: "4.8 ★",
      badge: "EXPERT ARTISAN",
    },
    {
      id: "tailor-3",
      name: "EcoStitch Alteration Hub",
      artisan: "Abdul Rahim",
      phone: "+91 98901 23456",
      address: "Near Metro Station Gate 2, Andheri West, Mumbai - 400058",
      distance: "3.8 km away",
      specialty: "Sleeve repairs, zip replacements, custom fabric tote bags",
      rating: "4.7 ★",
      badge: "EXPRESS TAILOR",
    },
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">ARTISAN TAILOR NETWORK</span>
        <h1>Upcycle Studio — Connect with Nearest Tailors</h1>
        <p>If your garment is slightly torn or damaged, send it to a verified local artisan tailor to repair or upcycle it into custom tote bags, jackets, or home decor.</p>
      </div>

      {assignedTailor && (
        <div style={{ background: "#edf4ef", border: "1px solid #c8d8ce", padding: "20px", borderRadius: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 4px", color: "#174d39" }}>✂️ Garment Assigned to {assignedTailor.name}</h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>Doorstep courier pickup requested. Contact Tailor: <strong>{assignedTailor.phone}</strong></p>
          </div>
          <button className="secondary" onClick={() => setAssignedTailor(null)}>Clear Assignment</button>
        </div>
      )}

      {/* Directory Cards of Nearest Tailors */}
      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>📍 Verified Local Tailors Near You</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {nearestTailors.map((tailor) => (
          <div
            key={tailor.id}
            style={{
              background: "white",
              border: "1px solid #e1ebe4",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
              <span style={{ background: "#edf4ef", color: "#174d39", padding: "4px 10px", borderRadius: "12px", fontSize: "10px", fontWeight: "bold" }}>
                {tailor.badge}
              </span>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#276749" }}>{tailor.rating} · {tailor.distance}</span>
            </div>

            <h3 style={{ margin: "0 0 4px", fontSize: "18px" }}>{tailor.name}</h3>
            <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#666" }}>Master Artisan: <strong>{tailor.artisan}</strong></p>
            <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#39805a" }}>Specialty: {tailor.specialty}</p>

            <div style={{ background: "#f8faf9", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontSize: "12px", border: "1px solid #eee" }}>
              <div>📍 <strong>Address:</strong> {tailor.address}</div>
              <div style={{ marginTop: "4px" }}>📞 <strong>Contact Number:</strong> <a href={`tel:${tailor.phone}`} style={{ color: "#174d39", fontWeight: "bold" }}>{tailor.phone}</a></div>
            </div>

            <button
              className="primary"
              style={{ width: "100%", padding: "12px", fontSize: "13px", borderRadius: "10px" }}
              onClick={() => setAssignedTailor(tailor)}
            >
              ✂️ Send Garment to {tailor.artisan} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
