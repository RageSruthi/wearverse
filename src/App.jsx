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
import RentalCalendar from "./RentalCalendar";
import OrderTrackingModal from "./OrderTrackingModal";

export const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

function AppShell() {
  const [page, setPage] = useState("Home");

  // Modals state
  const [detailProduct, setDetailProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [rentalProduct, setRentalProduct] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const {
    role,
    setRole,
    activeSeller,
    setActiveSeller,
    sellers,
    cart,
    wishlist,
    notifications,
    markNotificationsRead,
  } = useStore();

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems =
    role === "seller"
      ? ["Home", "Upload", "Shop", "Rent", "Upcycle", "Recycle", "Dashboard"]
      : ["Home", "Shop", "Rent", "Upcycle", "Recycle", "Cart", "Dashboard"];

  return (
    <div className="app-top-layout">
      {/* Top E-Commerce Horizontal Navigation Bar */}
      <header className="top-navbar-v2">
        <div className="nav-container-inner">
          {/* LEFT: Logo & Brand */}
          <div className="brand-logo-box" onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>
            <div className="brand-icon">W</div>
            <div className="brand-text">
              <span className="brand-title">WEARVERSE</span>
              <small className="brand-sub">CIRCULAR FASHION</small>
            </div>
          </div>

          {/* CENTER: Main Horizontal Links */}
          <nav className="horizontal-nav-links">
            {navItems.map((item) => (
              <button
                key={item}
                className={`top-nav-btn ${page === item ? "active" : ""}`}
                onClick={() => setPage(item)}
              >
                <span>{iconFor(item)}</span>
                {item}
                {item === "Cart" && cart.length > 0 && (
                  <span className="nav-badge">{cart.length}</span>
                )}
              </button>
            ))}
          </nav>

          {/* RIGHT: Notifications, Cart, Role Switcher, Profile */}
          <div className="top-nav-actions">
            {/* Role & Seller Switcher */}
            <div className="role-switch-pill">
              <button
                className={role === "buyer" ? "mode-btn active" : "mode-btn"}
                onClick={() => setRole("buyer")}
              >
                🛒 Buyer
              </button>
              <button
                className={role === "seller" ? "mode-btn active" : "mode-btn"}
                onClick={() => setRole("seller")}
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

            {/* Notifications Dropdown Trigger */}
            <div className="notif-wrapper">
              <button
                className="topbar-icon-btn"
                onClick={() => {
                  setShowNotifications((prev) => !prev);
                  markNotificationsRead();
                }}
                title="Notifications"
              >
                🔔 {unreadNotifs > 0 && <span className="topbar-badge">{unreadNotifs}</span>}
              </button>

              {showNotifications && (
                <div className="notif-dropdown">
                  <div className="notif-dropdown-header">
                    <h4>Notifications</h4>
                    <button onClick={() => setShowNotifications(false)}>×</button>
                  </div>
                  <div className="notif-dropdown-list">
                    {notifications.slice(0, 5).map((n) => (
                      <div className="notif-item" key={n.id}>
                        <span className="n-icon">{n.icon}</span>
                        <div>
                          <strong>{n.title}</strong>
                          <p>{n.message}</p>
                          <small>{n.date}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button className="topbar-icon-btn" onClick={() => setPage("Dashboard")} title="Wishlist">
              ♡ {wishlist.length > 0 && <span className="topbar-badge">{wishlist.length}</span>}
            </button>

            {/* Cart Button */}
            <button className="topbar-icon-btn" onClick={() => setPage("Cart")} title="Shopping Cart">
              🛒 {cart.length > 0 && <span className="topbar-badge">{cart.length}</span>}
            </button>

            {/* User Profile */}
            <div className="user-profile-pill" onClick={() => setPage("Dashboard")}>
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
                {role === "seller" ? activeSeller.name : "Sruthi"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content View Container */}
      <main className="main-viewport-content">
        {page === "Home" && (
          <Home
            setPage={setPage}
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
            onOpenRentalCalendar={setRentalProduct}
          />
        )}
        {page === "Shop" && (
          <Shop
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
            onOpenRentalCalendar={setRentalProduct}
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
        {page === "Recycle" && <Recycle setPage={setPage} />}
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
            onOpenDetail={setDetailProduct}
            onOpenTryOn={setTryOnProduct}
          />
        )}
      </main>

      {/* Persistent Support Chatbot anchored bottom-right */}
      <ChatBot setPage={setPage} />

      {/* Global Modals */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onOpenTryOn={setTryOnProduct}
          onOpenRentalCalendar={setRentalProduct}
        />
      )}

      {tryOnProduct && (
        <VirtualTryOn
          activeProduct={tryOnProduct}
          onClose={() => setTryOnProduct(null)}
        />
      )}

      {rentalProduct && (
        <RentalCalendar
          item={rentalProduct}
          onClose={() => setRentalProduct(null)}
          onRentalConfirmed={() => setPage("Cart")}
        />
      )}

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
    Upcycle: "✂️",
    Recycle: "♻️",
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
          <span className="label-accent">♻️ CIRCULAR FASHION PLATFORM</span>
          <h1>
            Fashion that
            <br />
            <em className="hero-highlight">lives again.</em>
          </h1>
          <p>
            Buy, sell, rent, upcycle, and recycle quality clothing. Backed by AI condition grading, 1,000+ demo items, 30 verified sellers, and Virtual Try-On.
          </p>

          <div className="hero-buttons">
            <button className="primary" onClick={() => setPage("Shop")}>
              Explore 1,000+ Catalog →
            </button>
            <button className="secondary" onClick={() => setPage("Rent")}>
              🗓️ Browse Rental Wardrobe
            </button>
            <button className="secondary" onClick={() => setPage("Upload")}>
              📷 Sell Your Clothes
            </button>
          </div>
        </div>

        {/* Removed top right hero-art graphic image as requested */}
      </section>

      {/* Featured Items Grid */}
      <div className="home-featured-section">
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

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
