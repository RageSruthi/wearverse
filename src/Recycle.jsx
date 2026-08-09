// src/Recycle.jsx
import { useState } from "react";

export default function Recycle() {
  const [assignedOrg, setAssignedOrg] = useState(null);

  const partners = [
    {
      id: "org-1",
      name: "Kisan Agricultural Fabric & Crop Cover Collective",
      type: "Agricultural Farmers",
      phone: "+91 97654 32109",
      address: "Krishi Seva Kendra, Nashik Highway, Pune, MH",
      purpose: "Shreds unwearable cotton fabric into crop mulch & frost protection blankets.",
      contactPerson: "Rameshwar Patil (Farmer Lead)",
    },
    {
      id: "org-2",
      name: "Vastra Daan Foundation & NGO",
      type: "Donation Drive",
      phone: "+91 98200 11223",
      address: "Community Welfare Building, Chembur East, Mumbai, MH",
      purpose: "Sanitizes and distributes wearable clothes to underprivileged families.",
      contactPerson: "Dr. Sunita Sharma (NGO Director)",
    },
    {
      id: "org-3",
      name: "EcoFiber Industrial Shredding Plant",
      type: "Textile Recycling",
      phone: "+91 99887 66554",
      address: "MIDC Industrial Estate, Thane West, Mumbai, MH",
      purpose: "Converts synthetic garments into insulation mats and acoustic carpet backing.",
      contactPerson: "Vikram Shinde (Plant Manager)",
    },
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">DONATION & FARMERS NETWORK</span>
        <h1>Recycle Network — Farmers & Donation Partners</h1>
        <p>Clothes detected as severely damaged or unwearable are sent directly to verified agricultural farmer groups (for crop covering & mulch) or donation drives.</p>
      </div>

      {assignedOrg && (
        <div style={{ background: "#edf4ef", border: "1px solid #c8d8ce", padding: "20px", borderRadius: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 4px", color: "#174d39" }}>♻️ Doorstep Pickup Scheduled for {assignedOrg.name}</h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>Contact Lead: <strong>{assignedOrg.contactPerson} (📞 {assignedOrg.phone})</strong></p>
          </div>
          <button className="secondary" onClick={() => setAssignedOrg(null)}>Clear Assignment</button>
        </div>
      )}

      {/* Directory Cards of Partners */}
      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>🌾 Verified Donation & Agricultural Recycling Partners</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {partners.map((partner) => (
          <div
            key={partner.id}
            style={{
              background: "white",
              border: "1px solid #e1ebe4",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ background: "#edf4ef", color: "#174d39", padding: "4px 10px", borderRadius: "12px", fontSize: "10px", fontWeight: "bold", display: "inline-block", marginBottom: "10px" }}>
              {partner.type}
            </span>

            <h3 style={{ margin: "0 0 4px", fontSize: "18px" }}>{partner.name}</h3>
            <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#666" }}>{partner.purpose}</p>

            <div style={{ background: "#f8faf9", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontSize: "12px", border: "1px solid #eee" }}>
              <div>👤 <strong>Contact Lead:</strong> {partner.contactPerson}</div>
              <div style={{ marginTop: "4px" }}>📞 <strong>Phone Number:</strong> <a href={`tel:${partner.phone}`} style={{ color: "#174d39", fontWeight: "bold" }}>{partner.phone}</a></div>
              <div style={{ marginTop: "4px" }}>📍 <strong>Address:</strong> {partner.address}</div>
            </div>

            <button
              className="primary"
              style={{ width: "100%", padding: "12px", fontSize: "13px", borderRadius: "10px" }}
              onClick={() => setAssignedOrg(partner)}
            >
              🚛 Schedule Free Pickup for {partner.type} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
