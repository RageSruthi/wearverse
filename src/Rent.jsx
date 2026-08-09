// src/Rent.jsx
import { useMemo, useState } from "react";
import { useStore } from "./StoreContext";
import { CATEGORIES } from "./mockDataGenerator";
import { productService } from "./mockServices";
import RentalCalendar from "./RentalCalendar";

export default function Rent({ onOpenDetail, onOpenTryOn, setPage }) {
  const { products, toggleWishlist, wishlist } = useStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeRentalItem, setActiveRentalItem] = useState(null);

  const rentalProducts = useMemo(() => {
    return productService.search(products, {
      query,
      category,
      mode: "rent",
    });
  }, [products, query, category]);

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">WEARVERSE RENTAL WARDROBE</span>
        <h1>Rent High-Fashion & Ethnic Wear</h1>
        <p>Wear designer pieces without buying them. Select dates, check live availability, and return easily.</p>
      </div>

      {/* Search & Categories */}
      <div className="shop-toolbar">
        <input
          className="shop-search"
          placeholder="Search sarees, designer gowns, lehengas, blazers available for rent..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chip-row">
          <button
            className={category === "All" ? "chip active" : "chip"}
            onClick={() => setCategory("All")}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={category === c ? "chip active" : "chip"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Rental Products Grid */}
      <div className="products">
        {rentalProducts.length === 0 && (
          <p className="empty-note">No rental items found in this category.</p>
        )}

        {rentalProducts.slice(0, 36).map((item) => {
          const wished = wishlist.some((w) => w.id === item.id);
          return (
            <div
              className="product-card-v2"
              key={item.id}
              onClick={() => {
                if (onOpenDetail) onOpenDetail(item);
              }}
            >
              <div className="product-image-box">
                <span className="badge-ai">🗓️ RENTAL READY</span>
                <button
                  className={`heart-btn ${wished ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                >
                  {wished ? "♥" : "♡"}
                </button>
                <img src={item.image} alt={item.title} className="product-photo" />

                <div className="quick-actions-overlay">
                  <button
                    className="quick-act-btn tryon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenTryOn) onOpenTryOn(item);
                    }}
                  >
                    📷 Try On
                  </button>
                  <button
                    className="quick-act-btn detail"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRentalItem(item);
                    }}
                  >
                    🗓️ Select Dates
                  </button>
                </div>
              </div>

              <div className="product-card-info">
                <small>{item.category} · From {item.sellerName}</small>
                <h3>{item.title}</h3>
                <p className="seller-byline">Deposit: ₹{item.deposit || 200}</p>

                <div className="price-mode-row">
                  <div>
                    <b>₹{item.rentalPrice || Math.round(item.price * 0.12)}/day</b>
                  </div>
                  <span className="status-pill mode-rent">RENT</span>
                </div>

                <button
                  className="sell-primary full-width"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRentalItem(item);
                  }}
                >
                  🗓️ Choose Dates & Rent →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeRentalItem && (
        <RentalCalendar
          item={activeRentalItem}
          onClose={() => setActiveRentalItem(null)}
          onRentalConfirmed={() => {
            setActiveRentalItem(null);
            if (setPage) setPage("Cart");
          }}
        />
      )}
    </div>
  );
}
