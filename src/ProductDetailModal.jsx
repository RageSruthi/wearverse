// src/ProductDetailModal.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function ProductDetailModal({ product, onClose, onOpenRentalCalendar }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.size || "M");
  const [selectedImg, setSelectedImg] = useState(product.image);

  if (!product) return null;

  const isWished = wishlist.some((w) => w.id === product.id);
  const images = product.images && product.images.length ? product.images : [product.image];

  function handleAddToCart(mode = "shop") {
    addToCart(product, { size: selectedSize, mode });
  }

  const reviewsList = product.reviews || [
    { author: "Ananya P. (Verified Buyer)", rating: 5, date: "3 days ago", comment: "Fabric condition is absolutely spotless! Fits like a dream." },
    { author: "Rohan M. (Verified Buyer)", rating: 4.9, date: "1 week ago", comment: "Fits perfectly. Quality is just as described by the seller." },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "850px", background: "white", padding: "28px", borderRadius: "20px" }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="main-image-box">
              <img src={selectedImg} alt={product.title} className="detail-main-img" style={{ width: "100%", height: "340px", objectFit: "cover", borderRadius: "14px" }} />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-list" style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImg === img ? "active" : ""}`}
                    onClick={() => setSelectedImg(img)}
                    style={{ border: "none", background: "none", cursor: "pointer" }}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Info */}
          <div className="detail-info">
            <div className="detail-header">
              <span className="category-tag" style={{ background: "#edf4ef", color: "#174d39", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: "bold" }}>
                {product.category} · {product.subcategory}
              </span>
              <h2 style={{ margin: "8px 0 4px", fontSize: "22px" }}>{product.title}</h2>
              <div className="rating-row" style={{ fontSize: "12px", color: "#666", display: "flex", gap: "10px", alignItems: "center" }}>
                <span className="stars" style={{ color: "#276749", fontWeight: "bold" }}>★ {product.rating}</span>
                <span className="reviews">({product.reviewsCount || 24} verified buyer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="detail-pricing" style={{ margin: "16px 0", display: "flex", gap: "16px" }}>
              <div className="price-box buy-price">
                <span className="price-label" style={{ fontSize: "11px", color: "#666" }}>Resale Price</span>
                <div className="price-val-row">
                  <span className="current-price" style={{ fontSize: "22px", fontWeight: "bold", color: "#174d39" }}>₹{product.price}</span>
                </div>
              </div>

              {product.mode !== "shop" && (
                <div className="price-box rent-price">
                  <span className="price-label" style={{ fontSize: "11px", color: "#666" }}>Rental Rate</span>
                  <div className="price-val-row">
                    <span className="current-price" style={{ fontSize: "22px", fontWeight: "bold", color: "#174d39" }}>₹{product.rentalPrice}</span>
                    <span className="per-day" style={{ fontSize: "12px", color: "#666" }}> / day</span>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#f8faf9", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontSize: "12px" }}>
              <div>Condition: <strong>{product.condition}</strong></div>
              <div>Material: <strong>{product.material}</strong></div>
              <div>Size: <strong>{selectedSize}</strong></div>
              <div>Seller: <strong>{product.sellerName}</strong></div>
            </div>

            {/* Size Selector */}
            <div className="size-selector-section" style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>Select Size:</label>
              <div className="size-chips" style={{ display: "flex", gap: "8px" }}>
                {(product.sizesAvailable || ["XS", "S", "M", "L", "XL"]).map((sz) => (
                  <button
                    key={sz}
                    className={`cat-pill ${selectedSize === sz ? "active" : ""}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="customer-reviews-box" style={{ background: "#ffffff", border: "1px solid #e1ebe4", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "13px", color: "#174d39" }}>💬 Verified Buyer Reviews</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {reviewsList.map((rev, idx) => (
                  <div key={idx} style={{ fontSize: "11px", borderBottom: "1px solid #f0f0f0", paddingBottom: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#444" }}>
                      <strong>{rev.author}</strong>
                      <span style={{ color: "#276749" }}>★ {rev.rating}</span>
                    </div>
                    <p style={{ margin: "2px 0 0", color: "#666" }}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions" style={{ display: "flex", gap: "10px" }}>
              {product.mode !== "rent" && (
                <button className="primary" style={{ flex: 1, padding: "12px" }} onClick={() => handleAddToCart("shop")}>
                  🛒 Add to Cart (₹{product.price})
                </button>
              )}

              {product.mode !== "shop" && (
                <button
                  className="secondary"
                  style={{ flex: 1, padding: "12px" }}
                  onClick={() => {
                    onClose();
                    if (onOpenRentalCalendar) onOpenRentalCalendar(product);
                  }}
                >
                  🗓️ Rent Outfit
                </button>
              )}

              <button
                className={`secondary ${isWished ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                style={{ padding: "12px" }}
              >
                {isWished ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
