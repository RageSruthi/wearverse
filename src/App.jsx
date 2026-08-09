// src/App.jsx
import { useState } from "react";
import "./App.css";
import "./App-additions-2.css";
import { StoreProvider, useStore } from "./StoreContext";

import Shop from "./Shop";
import Rent from "./Rent";
import Upcycle from "./Upcycle";
import Recycle from "./Recycle";
import Cart from "./Cart";
import SellerUpload from "./SellerUpload";
import Dashboard from "./Dashboard";
import ChatBot from "./ChatBot";
import VirtualTryOn from "./VirtualTryOn";
import ProductDetailModal from "./ProductDetailModal";
import OrderTrackingModal from "./OrderTrackingModal";

export const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

function AppShell() {
  const [page, setPage] = useState("Home");

  // Modals state
  const [detailProduct, setDetailProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    role,
    setRole,
    activeSeller,
    setActiveSeller,
    sellers,
    cart,
    wishlist,
  } = useStore();

  // BUYER NAV: Home, Shop, Rent, Cart, Dashboard (Upcycle & Recycle removed from Buyer nav)
  // SELLER NAV: Upload, Upcycle Studio, Recycle Network (Dashboard removed for Seller nav)
  const navItems =
    role === "seller"
      ? ["Upload", "Upcycle Studio", "Recycle Network"]
      : ["Home", "Shop", "Rent", "Cart", "Dashboard"];

  return (
    <div className="app-top-layout">
      {/* Top E-Commerce Horizontal Navigation Bar */}
      <header className="top-navbar-v2">
        <div className="nav-container-inner">
          {/* TOP LEFT: WEARVERSE Logo & Tagline */}
          <div className="brand-logo-box" onClick={() => setPage(role === "seller" ? "Upload" : "Home")} style={{ cursor: "pointer" }}>
            <div className="brand-icon">W</div>
            <div className="brand-text">
              <span className="brand-title">WEARVERSE</span>
              <small className="brand-sub" style={{ color: "#a3cfbb", fontSize: "9px", fontWeight: "bold" }}>
                Give your clothes a Second life
              </small>
            </div>
          </div>

          {/* CENTER: Main Horizontal Links */}
          <nav className="horizontal-nav-links">
            {navItems.map((item) => {
              const targetPage = item === "Upcycle Studio" ? "Upcycle" : item === "Recycle Network" ? "Recycle" : item;
              return (
                <button
                  key={item}
                  className={`top-nav-btn ${page === targetPage ? "active" : ""}`}
                  onClick={() => setPage(targetPage)}
                >
                  <span>{iconFor(item)}</span>
                  {item}
                  {item === "Cart" && cart.length > 0 && (
                    <span className="nav-badge">{cart.length}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* TOP RIGHT: Role Switcher, Cart, Profile (Bell Icon Removed) */}
          <div className="top-nav-actions">
            {/* Role & Seller Switcher */}
            <div className="role-switch-pill">
              <button
                className={role === "buyer" ? "mode-btn active" : "mode-btn"}
                onClick={() => {
                  setRole("buyer");
                  setPage("Home");
                }}
              >
                🛒 Buyer
              </button>
              <button
                className={role === "seller" ? "mode-btn active" : "mode-btn"}
                onClick={() => {
                  setRole("seller");
                  setPage("Upload");
                }}
              >
                🏪 Seller
              </button>

              {role === "seller" && (
                <select
                  className="seller-select-top"
                  value={activeSeller.id}
                  onChange={(e) => setActiveSeller(e.target.value)}
                >
                  {sellers.slice(0, 4).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Wishlist Button (Buyer Only) */}
            {role === "buyer" && (
              <button className="topbar-icon-btn" onClick={() => setPage("Dashboard")} title="Wishlist">
                ♡ {wishlist.length > 0 && <span className="topbar-badge">{wishlist.length}</span>}
              </button>
            )}

            {/* Cart Button (Buyer Only) */}
            {role === "buyer" && (
              <button className="topbar-icon-btn" onClick={() => setPage("Cart")} title="Shopping Cart">
                🛒 {cart.length > 0 && <span className="topbar-badge">{cart.length}</span>}
              </button>
            )}

            {/* User Profile Trigger - Opens Profile Details & Edit Modal */}
            <div className="user-profile-pill" onClick={() => setShowProfileModal(true)}>
              <img
                src={
                  role === "seller"
                    ? activeSeller.avatar
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                }
                alt="Profile"
                className="avatar-img"
                onError={(e) => {
                  e.target.src = DEFAULT_FALLBACK_IMG;
                }}
              />
              <span className="user-name-text">
                {role === "seller" ? activeSeller.name : "Sruthi R."}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="main-viewport-content">
        {page === "Home" && (
          <Home
            setPage={setPage}
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
          />
        )}
        {page === "Shop" && (
          <Shop
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
          />
        )}
        {page === "Rent" && (
          <Rent
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
            setPage={setPage}
          />
        )}
        {page === "Upcycle" && <Upcycle />}
        {page === "Recycle" && <Recycle />}
        {page === "Cart" && (
          <Cart
            setPage={setPage}
            onOpenTryOn={setTryOnProduct}
            onOpenOrderTracking={setTrackingOrderId}
          />
        )}
        {page === "Upload" && <SellerUpload setPage={setPage} />}
        {page === "Dashboard" && (
          <Dashboard
            setPage={setPage}
            onOpenOrderTracking={setTrackingOrderId}
          />
        )}
      </main>

      {/* Persistent ChatGPT Style Support Chatbot anchored at Bottom Right */}
      <ChatBot setPage={setPage} />

      {/* Profile Details & Edit Modal */}
      {showProfileModal && (
        <ProfileEditModal onClose={() => setShowProfileModal(false)} />
      )}

      {/* Product Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onOpenTryOn={setTryOnProduct}
        />
      )}

      {/* Virtual Try-On Modal */}
      {tryOnProduct && (
        <VirtualTryOn
          activeProduct={tryOnProduct}
          onClose={() => setTryOnProduct(null)}
        />
      )}

      {/* Order Tracking Modal */}
      {trackingOrderId && (
        <OrderTrackingModal
          orderId={trackingOrderId}
          onClose={() => setTrackingOrderId(null)}
        />
      )}
    </div>
  );
}

function iconFor(name) {
  return {
    Home: "⌂",
    Shop: "🛍️",
    Rent: "🗓️",
    "Upcycle Studio": "✂️",
    "Recycle Network": "♻️",
    Cart: "🛒",
    Upload: "📷",
    Dashboard: "▤",
  }[name];
}

function Home({ setPage, onOpenDetail }) {
  const { products } = useStore();
  const featured = products.slice(0, 8);

  return (
    <div className="page-home-clean">
      <section className="hero-clean">
        <div className="hero-text-block">
          <span className="label-accent">♻️ WEARVERSE PLATFORM</span>
          <h1>
            Give your clothes
            <br />
            <em className="hero-highlight">a Second life.</em>
          </h1>
          <p>
            Buy, sell, rent, upcycle with tailors, and recycle to farmers. Backed by 10,000 verified marketplace items, AI condition scanning, and Virtual Try-On.
          </p>

          <div className="hero-buttons">
            <button className="primary" onClick={() => setPage("Shop")}>
              Explore 10,000+ Catalog →
            </button>
            <button className="secondary" onClick={() => setPage("Rent")}>
              🗓️ Browse Rental Wardrobe
            </button>
          </div>
        </div>
      </section>

      {/* Featured Items Grid */}
      <div className="home-featured-section" style={{ marginTop: "40px" }}>
        <h2>🔥 Featured Marketplace Listings</h2>
        <div className="products">
          {featured.map((item) => (
            <div
              className="product-card-v2"
              key={item.id}
              onClick={() => onOpenDetail(item)}
            >
              <div className="product-image-box">
                <span className="badge-ai">✓ AI APPROVED</span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-photo"
                  onError={(e) => {
                    e.target.src = DEFAULT_FALLBACK_IMG;
                  }}
                />
              </div>
              <div className="product-card-info">
                <small>{item.category} · {item.condition}</small>
                <h3>{item.title}</h3>
                <b>₹{item.price}</b>
                {item.mode !== "shop" && <span className="rent-tag">or ₹{item.rentalPrice}/day rent</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileEditModal({ onClose }) {
  const { role, activeSeller } = useStore();
  const [profile, setProfile] = useState({
    name: role === "seller" ? activeSeller.name : "Sruthi R.",
    email: "sruthi.wearverse@gmail.com",
    phone: "+91 98765 43210",
    location: role === "seller" ? activeSeller.location : "Mumbai, Maharashtra",
    bio: role === "seller" ? activeSeller.bio : "Passionate about sustainable circular fashion and giving clothes a second life.",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px", background: "white", padding: "28px", borderRadius: "20px" }}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <span className="label">USER PROFILE & DETAILS</span>
        <h2 style={{ margin: "4px 0 16px" }}>{role === "seller" ? "Seller Profile Details" : "Buyer Profile Details"}</h2>

        {saved ? (
          <div style={{ background: "#edf4ef", color: "#174d39", padding: "20px", borderRadius: "12px", textAlign: "center", fontWeight: "bold" }}>
            ✓ Profile details updated successfully!
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Full Name
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
              />
            </label>

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Email Address
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
              />
            </label>

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              Phone Number
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
              />
            </label>

            <label style={{ fontSize: "12px", fontWeight: "bold" }}>
              City & Location
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
              />
            </label>

            <button type="submit" className="primary" style={{ padding: "12px", marginTop: "8px" }}>
              Save Profile Changes →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
