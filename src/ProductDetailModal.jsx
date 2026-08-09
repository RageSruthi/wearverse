// src/ProductDetailModal.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function ProductDetailModal({ product, onClose, onOpenTryOn, onOpenRentalCalendar }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.size || "M");
  const [selectedImg, setSelectedImg] = useState(product.image);

  if (!product) return null;

  const isWished = wishlist.some((w) => w.id === product.id);
  const images = product.images && product.images.length ? product.images : [product.image];

  function handleAddToCart(mode = "shop") {
    addToCart(product, { size: selectedSize, mode });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="main-image-box">
              <img src={selectedImg} alt={product.title} className="detail-main-img" />
              <span className="sustainability-badge">♻️ {product.sustainabilityScore}/100 Eco Score</span>
            </div>
            {images.length > 1 && (
              <div className="thumbnail-list">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImg === img ? "active" : ""}`}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Info */}
          <div className="detail-info">
            <div className="detail-header">
              <span className="category-tag">{product.category} · {product.subcategory}</span>
              <h2>{product.title}</h2>
              <div className="rating-row">
                <span className="stars">★ {product.rating}</span>
                <span className="reviews">({product.reviewsCount} verified reviews)</span>
                <span className="location">📍 {product.location}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="detail-pricing">
              <div className="price-box buy-price">
                <span className="price-label">Resale Price</span>
                <div className="price-val-row">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
                </div>
              </div>

              {product.mode !== "shop" && (
                <div className="price-box rent-price">
                  <span className="price-label">Rental Rate</span>
                  <div className="price-val-row">
                    <span className="current-price">₹{product.rentalPrice}</span>
                    <span className="per-day">/ day</span>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Condition</span>
                <strong>{product.condition}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <strong>{product.material}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">Brand</span>
                <strong>{product.brand}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">Quality Score</span>
                <strong className="green-text">{product.qualityScore}/100 Verified</strong>
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-selector-section">
              <label>Select Size:</label>
              <div className="size-chips">
                {(product.sizesAvailable || ["XS", "S", "M", "L", "XL"]).map((sz) => (
                  <button
                    key={sz}
                    className={`size-chip ${selectedSize === sz ? "active" : ""}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sustainability Impact Metrics */}
            <div className="eco-impact-box">
              <h4>🌱 Environmental Impact Saved</h4>
              <div className="impact-metrics">
                <div>
                  <span className="impact-icon">💧</span>
                  <strong>{product.waterSaved} Liters</strong>
                  <small>Water Saved</small>
                </div>
                <div>
                  <span className="impact-icon">🌿</span>
                  <strong>{product.co2Saved} kg</strong>
                  <small>CO₂ Emissions Saved</small>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="detail-seller-card">
              <img src={product.sellerAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} alt={product.sellerName} className="seller-avatar" />
              <div>
                <strong>Sold by {product.sellerName}</strong>
                <p>★ {product.sellerRating || 4.9} Seller Rating · Verified WearVerse Member</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions">
              <button
                className="action-btn tryon-btn"
                onClick={() => {
                  onClose();
                  onOpenTryOn(product);
                }}
              >
                📷 Virtual Try-On
              </button>

              {product.mode !== "rent" && (
                <button className="action-btn buy-btn" onClick={() => handleAddToCart("shop")}>
                  🛒 Add to Cart (₹{product.price})
                </button>
              )}

              {product.mode !== "shop" && (
                <button
                  className="action-btn rent-btn"
                  onClick={() => {
                    onClose();
                    onOpenRentalCalendar(product);
                  }}
                >
                  🗓️ Rent This Outfit (₹{product.rentalPrice}/day)
                </button>
              )}

              <button
                className={`action-btn wish-btn ${isWished ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
              >
                {isWished ? "♥ Wishlisted" : "♡ Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
