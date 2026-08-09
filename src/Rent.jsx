// src/Rent.jsx
import { useMemo, useState } from "react";
import { useStore } from "./StoreContext";
import { CATEGORIES } from "./mockDataGenerator";

export default function Rent({ onOpenTryOn, setPage }) {
  const { products, addToCart } = useStore();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedRentalItem, setSelectedRentalItem] = useState(null);

  const rentalProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.mode === "shop") return false;
      if (category !== "All" && p.category !== category) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const text = `${p.title} ${p.category} ${p.subcategory} ${p.color}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, category]);

  return (
    <div className="page">
      {/* Header Banner */}
      <div className="page-heading">
        <span className="label">WEARVERSE RENTAL WARDROBE</span>
        <h1>Rent High-Fashion & Ethnic Wear</h1>
        <p>Wear designer sarees, dresses, and lehengas for 3 to 30 days with live return date calculation.</p>
      </div>

      {/* Toolbar Search Bar */}
      <div className="shop-toolbar-v2">
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="shop-search-input"
            placeholder="Search rental sarees, lehengas, gowns, party wear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && <button className="clear-search-btn" onClick={() => setQuery("")}>×</button>}
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="category-pills-row">
        <button
          className={`cat-pill ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          All Rental Categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`cat-pill ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Rental Products Grid */}
      <div className="products">
        {rentalProducts.slice(0, 36).map((item) => (
          <div className="product-card-v2" key={item.id}>
            <div className="product-image-box">
              <span className="badge-ai">🗓️ RENTAL WARDROBE</span>
              <img
                src={item.image}
                alt={item.title}
                className="product-photo"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>
            <div className="product-card-info">
              <small>{item.category} · {item.condition}</small>
              <h3>{item.title}</h3>
              <p className="seller-byline">Owner: {item.sellerName} · {item.location}</p>

              <div className="price-mode-row">
                <b>₹{item.rentalPrice}/day</b>
                <span className="status-pill mode-rent">RENT AVAILABLE</span>
              </div>

              <div className="card-buttons">
                <button
                  className="primary rent-now-btn"
                  onClick={() => setSelectedRentalItem(item)}
                >
                  🗓️ Choose Dates & Rent →
                </button>
                <button
                  className="secondary"
                  onClick={() => {
                    if (onOpenTryOn) onOpenTryOn(item);
                  }}
                >
                  📷 Try On
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Rental Selection Modal */}
      {selectedRentalItem && (
        <RentalModalView
          item={selectedRentalItem}
          onClose={() => setSelectedRentalItem(null)}
          onConfirm={(bookingDetails) => {
            addToCart(selectedRentalItem, bookingDetails);
            setSelectedRentalItem(null);
            if (setPage) setPage("Cart");
          }}
        />
      )}
    </div>
  );
}

function RentalModalView({ item, onClose, onConfirm }) {
  const [duration, setDuration] = useState(5);
  const [startDate, setStartDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));

  const startD = new Date(startDate);
  const returnD = new Date(startD);
  returnD.setDate(returnD.getDate() + Number(duration));
  const returnDateStr = returnD.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const dailyRate = item.rentalPrice || Math.round(item.price * 0.12);
  const rentalTotal = dailyRate * duration;
  const deposit = Math.round(rentalTotal * 0.2);
  const grandTotal = rentalTotal + deposit + 49;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rental-detail-card" onClick={(e) => e.stopPropagation()} style={{ background: "white", maxWidth: "700px", width: "95%", borderRadius: "20px", padding: "28px", position: "relative" }}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="rental-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px" }}>
          <div>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "14px" }} />
            <h3 style={{ margin: "12px 0 4px", fontSize: "16px" }}>{item.title}</h3>
            <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Category: {item.category} · Condition: {item.condition}</p>
          </div>

          <div>
            <span className="label">RENTAL DATES & COST</span>
            <h2 style={{ margin: "4px 0 16px", fontSize: "20px" }}>Choose Duration</h2>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>Duration (Days):</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {[3, 5, 7, 10, 15, 30].map((d) => (
                  <button
                    key={d}
                    className={`cat-pill ${duration === d ? "active" : ""}`}
                    onClick={() => setDuration(d)}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>Start Date:</label>
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
              />
            </div>

            <div style={{ background: "#edf4ef", padding: "12px 16px", borderRadius: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#174d39", marginBottom: "4px" }}>
                🔄 <strong>Calculated Return Date:</strong> {returnDateStr}
              </div>
              <div style={{ fontSize: "12px", color: "#174d39" }}>
                💰 <strong>Rental Rate ({duration} days @ ₹{dailyRate}/day):</strong> ₹{rentalTotal}
              </div>
            </div>

            <button
              className="primary"
              style={{ width: "100%", padding: "12px" }}
              onClick={() =>
                onConfirm({
                  mode: "rent",
                  rentalDuration: duration,
                  rentalStart: startDate,
                  rentalEnd: returnDateStr,
                  rentalTotal: grandTotal,
                })
              }
            >
              Confirm Rental Booking (₹{grandTotal}) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
