// src/Dashboard.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function Dashboard({ onOpenOrderTracking }) {
  const { orders, rentals } = useStore();
  const [activeTab, setActiveTab] = useState("My Orders");

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">BUYER HUB</span>
        <h1>My Dashboard</h1>
        <p>Track present active orders/rentals and review complete past purchase and rental history.</p>
      </div>

      {/* Tabs Bar: ONLY My Orders and My Rentals */}
      <div className="dashboard-tabs-bar" style={{ display: "flex", gap: "12px", borderBottom: "2px solid #e2ebe5", marginBottom: "24px" }}>
        <button
          className={`dash-tab ${activeTab === "My Orders" ? "active" : ""}`}
          onClick={() => setActiveTab("My Orders")}
          style={{ padding: "12px 24px", fontWeight: "bold", border: "none", background: "none", fontSize: "15px", cursor: "pointer", borderBottom: activeTab === "My Orders" ? "3px solid #174d39" : "none", color: activeTab === "My Orders" ? "#174d39" : "#666" }}
        >
          📦 My Orders ({orders.length})
        </button>

        <button
          className={`dash-tab ${activeTab === "My Rentals" ? "active" : ""}`}
          onClick={() => setActiveTab("My Rentals")}
          style={{ padding: "12px 24px", fontWeight: "bold", border: "none", background: "none", fontSize: "15px", cursor: "pointer", borderBottom: activeTab === "My Rentals" ? "3px solid #174d39" : "none", color: activeTab === "My Rentals" ? "#174d39" : "#666" }}
        >
          🗓️ My Rentals ({rentals.length})
        </button>
      </div>

      {/* TAB 1: MY ORDERS */}
      {activeTab === "My Orders" && (
        <div className="dashboard-section">
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Current & Previous Orders History</h2>
          {orders.length === 0 ? (
            <div style={{ padding: "40px", background: "white", borderRadius: "16px", textCenter: "center", border: "1px solid #e1ebe4" }}>
              <p style={{ margin: 0, color: "#666" }}>No orders placed yet. Explore the marketplace shop to place a demo order!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {orders.map((ord) => (
                <div key={ord.id} style={{ background: "white", border: "1px solid #e1ebe4", borderRadius: "16px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "12px", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: "16px" }}>Order #{ord.id}</h3>
                      <span style={{ fontSize: "12px", color: "#666" }}>Placed: {new Date(ord.placedAt).toLocaleString()} · Payment: {ord.paymentMethod?.toUpperCase() || "UPI"}</span>
                    </div>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ background: "#edf4ef", color: "#174d39", padding: "6px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>
                        {ord.status}
                      </span>
                      <button
                        className="primary"
                        onClick={() => {
                          if (onOpenOrderTracking) onOpenOrderTracking(ord.id);
                        }}
                      >
                        🚚 Track Live Order →
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {ord.items.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <img src={item.image} alt={item.title} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: "13px" }}>{item.title}</strong>
                          <div style={{ fontSize: "11px", color: "#666" }}>Category: {item.category} · Seller: {item.sellerName || "WearVerse Seller"}</div>
                        </div>
                        <b style={{ fontSize: "14px", color: "#174d39" }}>₹{item.price}</b>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Agent Information */}
                  <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px dashed #eee", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                    <div>
                      🚚 <strong>Assigned Express Courier:</strong> Ramesh Kumar (Ph: +91 98765 12345)
                    </div>
                    <strong>Total Amount Paid: ₹{ord.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY RENTALS */}
      {activeTab === "My Rentals" && (
        <div className="dashboard-section">
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Active & Past Rental Wardrobe History</h2>
          {rentals.length === 0 ? (
            <div style={{ padding: "40px", background: "white", borderRadius: "16px", textCenter: "center", border: "1px solid #e1ebe4" }}>
              <p style={{ margin: 0, color: "#666" }}>No active rentals. Browse the Rental Wardrobe to reserve outfits!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {rentals.map((ren) => {
                const returnDate = new Date(ren.end);
                const now = new Date();
                const diffDays = Math.ceil((returnDate - now) / (1000 * 60 * 60 * 24));
                const daysRemaining = diffDays > 0 ? diffDays : 0;

                return (
                  <div key={ren.id} style={{ background: "white", border: "1px solid #e1ebe4", borderRadius: "16px", padding: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
                    <img src={ren.image} alt={ren.title} style={{ width: "90px", height: "90px", borderRadius: "12px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>{ren.title}</h3>
                      <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#666" }}>Owner: {ren.sellerName} · Category: {ren.category}</p>
                      <div style={{ background: "#edf4ef", padding: "6px 12px", borderRadius: "8px", display: "inline-block", fontSize: "12px", color: "#174d39", fontWeight: "bold" }}>
                        🗓️ {ren.start} to {ren.end} ({ren.duration} days)
                      </div>
                      {daysRemaining <= 2 && daysRemaining > 0 && (
                        <div style={{ color: "#c53030", fontSize: "11px", fontWeight: "bold", marginTop: "4px" }}>
                          ⚠️ Return due in {daysRemaining} days! Contact courier for doorstep pickup.
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "inline-block", background: "#fefcbf", color: "#975a16", padding: "4px 10px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold", marginBottom: "8px" }}>
                        {ren.status || "Booked"}
                      </span>
                      <b style={{ display: "block", fontSize: "18px", color: "#174d39" }}>₹{ren.totalCost}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
