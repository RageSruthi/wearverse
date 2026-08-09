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
    <div className="app">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">W</div>
          <div>
            <b>WEARVERSE</b>
            <small>CIRCULAR FASHION</small>
          </div>
        </div>

        {/* Role & Seller Switcher */}
        <div className="sidebar-role-box">
          <div className="role-toggle">
            <button
              className={role === "buyer" ? "chip active" : "chip"}
              onClick={() => setRole("buyer")}
            >
              🛒 Buyer
            </button>
            <button
              className={role === "seller" ? "chip active" : "chip"}
              onClick={() => setRole("seller")}
            >
              🏪 Seller
            </button>
          </div>

          {role === "seller" && (
            <div className="seller-select-box">
              <small>Demo Seller Account:</small>
              <select
                value={activeSeller.id}
                onChange={(e) => setActiveSeller(e.target.value)}
              >
                {sellers.slice(0, 4).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <p className="menu-label">MARKETPLACE NAVIGATION</p>

        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-button ${page === item ? "active" : ""}`}
            onClick={() => setPage(item)}
          >
            <span>{iconFor(item)}</span>
            {item}
            {item === "Cart" && cart.length > 0 && <span className="nav-badge">{cart.length}</span>}
          </button>
        ))}

        <div className="sidebar-bottom-info">
          <div className="sustainability-mini-card">
            <span>♻️ 1,000+ Items</span>
            <small>Circular Fashion Demo</small>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main">
        {/* Top Header Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <span className="current-page-label">{page}</span>
          </div>

          <div className="top-right">
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
            <button className="topbar-icon-btn" onClick={() => setPage("Dashboard")}>
              ♡ {wishlist.length > 0 && <span className="topbar-badge">{wishlist.length}</span>}
            </button>

            {/* Cart Button */}
            <button className="topbar-icon-btn" onClick={() => setPage("Cart")}>
              🛒 {cart.length > 0 && <span className="topbar-badge">{cart.length}</span>}
            </button>

            {/* User Profile */}
            <div className="user" onClick={() => setPage("Dashboard")}>
              <img
                src={
                  role === "seller"
                    ? activeSeller.avatar
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                }
                alt="Profile"
                className="avatar-img"
              />
              <div>
                <b>{role === "seller" ? activeSeller.name : "Sruthi"}</b>
                <small>{role === "seller" ? `Seller (${activeSeller.location})` : "Buyer Member"}</small>
              </div>
            </div>
          </div>
        </header>

        {/* Page Switcher */}
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

      {/* Floating Support Chatbot anchored bottom-right */}
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
    <div className="page">
      <section className="hero">
        <div>
          <span className="label">♻️ CIRCULAR FASHION PLATFORM</span>
          <h1>
            Fashion that
            <br />
            <em>lives again.</em>
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

        <div className="hero-art">
          <div className="fashion">👗</div>
          <div className="approved">
            ✓ AI APPROVED
            <br />
            <small>1,000+ Items Seeded</small>
          </div>
          <div className="eco">
            ♻️<span>Give clothes<br />another life</span>
          </div>
        </div>
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
                <img src={item.image} alt={item.title} className="product-photo" />
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
