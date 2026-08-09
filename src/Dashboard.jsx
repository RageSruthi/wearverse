// src/Dashboard.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

const BUYER_TABS = ["Sustainability Overview", "My Orders", "My Rentals", "Wishlist", "Recently Viewed", "Recycle History", "Notifications"];
const SELLER_TABS = ["Seller Overview", "My Inventory", "Sales Orders", "Rental Bookings"];

export default function Dashboard({ setPage, onOpenOrderTracking, onOpenDetail }) {
  const {
    role,
    setRole,
    activeSeller,
    setActiveSeller,
    sellers,
    orders,
    rentals,
    wishlist,
    recentlyViewed,
    recycleRequests,
    notifications,
    markNotificationsRead,
    resetDemoData,
    getBuyerStats,
    getSellerStats,
    addToCart,
  } = useStore();

  const [activeTab, setActiveTab] = useState(role === "seller" ? "Seller Overview" : "Sustainability Overview");

  const buyerStats = getBuyerStats();
  const sellerStats = getSellerStats();

  return (
    <div className="page">
      <div className="page-heading-row">
        <div>
          <span className="label">
            {role === "seller" ? `STORE DASHBOARD — ${activeSeller.name}` : "BUYER DASHBOARD"}
          </span>
          <h1>{role === "seller" ? `${activeSeller.name}'s Seller Hub` : "My Activity Hub"}</h1>
          <p>Real-time activity tracking, orders, rentals, inventory, and eco-impact metrics.</p>
        </div>

        {/* Demo Reset Button */}
        <div className="dashboard-top-actions">
          <button
            className="reset-demo-btn"
            onClick={() => {
              if (window.confirm("Reset demo data back to default state? This will clear temporary cart, orders, and uploaded listings.")) {
                resetDemoData();
              }
            }}
          >
            🔄 Reset Demo Data
          </button>
        </div>
      </div>

      {/* Role & Seller Switcher Banner */}
      <div className="dashboard-role-banner">
        <div className="role-selector-group">
          <span>Active View:</span>
          <button
            className={`role-tab-btn ${role === "buyer" ? "active" : ""}`}
            onClick={() => {
              setRole("buyer");
              setActiveTab("Sustainability Overview");
            }}
          >
            🛒 Buyer Mode
          </button>
          <button
            className={`role-tab-btn ${role === "seller" ? "active" : ""}`}
            onClick={() => {
              setRole("seller");
              setActiveTab("Seller Overview");
            }}
          >
            🏪 Seller Mode
          </button>
        </div>

        {role === "seller" && (
          <div className="seller-select-dropdown">
            <span>Switch Seller Account:</span>
            <select
              value={activeSeller.id}
              onChange={(e) => setActiveSeller(e.target.value)}
            >
              {sellers.slice(0, 4).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.location})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs-bar">
        {(role === "seller" ? SELLER_TABS : BUYER_TABS).map((t) => (
          <button
            key={t}
            className={`dash-tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t} {t === "Notifications" && notifications.filter((n) => !n.read).length > 0 && `(${notifications.filter((n) => !n.read).length})`}
          </button>
        ))}
      </div>

      {/* ---------------- BUYER DASHBOARD TABS ---------------- */}

      {role === "buyer" && activeTab === "Sustainability Overview" && (
        <div className="dashboard-section">
          <h2 className="section-subheading">🌱 Your Circular Fashion Impact</h2>
          <div className="stats-grid">
            <div className="stat-card-v2">
              <div className="stat-icon">⭐</div>
              <span className="stat-label">EcoPoints Balance</span>
              <h2>{buyerStats.points} pts</h2>
              <small>Earned from reusing & saving clothing</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">👕</div>
              <span className="stat-label">Garments Reused</span>
              <h2>{buyerStats.clothesReused} Items</h2>
              <small>Orders + Rentals + Recycled</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">💧</div>
              <span className="stat-label">Water Saved</span>
              <h2>{buyerStats.waterSaved.toLocaleString()} Liters</h2>
              <small>Clean water kept in ecosystem</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">🌿</div>
              <span className="stat-label">CO₂ Saved</span>
              <h2>{buyerStats.co2Saved.toFixed(1)} kg</h2>
              <small>Carbon footprint reduced</small>
            </div>
          </div>

          <h2 className="section-subheading" style={{ marginTop: 32 }}>Recent Orders Quick View</h2>
          {orders.length === 0 ? (
            <div className="activity-box">No recent orders yet. Explore the shop to place a demo order!</div>
          ) : (
            <div className="orders-list">
              {orders.slice(0, 3).map((ord) => (
                <div className="order-row-card" key={ord.id}>
                  <div>
                    <h4>Order #{ord.id}</h4>
                    <p>{ord.items.length} item(s) · Placed on {new Date(ord.placedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="order-row-right">
                    <span className="status-pill">{ord.status}</span>
                    <b>₹{ord.total}</b>
                    <button className="sell-secondary" onClick={() => onOpenOrderTracking(ord.id)}>
                      🚚 Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "My Orders" && (
        <div className="dashboard-section">
          <h2>My Order History ({orders.length})</h2>
          {orders.length === 0 ? (
            <p className="empty-note">No orders placed yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((ord) => (
                <div key={ord.id} className="order-full-card">
                  <div className="order-card-top">
                    <div>
                      <h3>Order #{ord.id}</h3>
                      <small>Placed: {new Date(ord.placedAt).toLocaleString()} · Payment: {ord.paymentMethod.toUpperCase()}</small>
                    </div>
                    <div className="order-card-top-right">
                      <span className="status-pill">{ord.status}</span>
                      <button className="sell-primary" onClick={() => onOpenOrderTracking(ord.id)}>
                        🚚 Live Tracking →
                      </button>
                    </div>
                  </div>

                  <div className="order-items-grid">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="order-item-mini">
                        <img src={item.image} alt={item.title} />
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.category} · Sold by {item.sellerName}</small>
                          {item.rentalStart && (
                            <small className="rental-dates-sm">Rental: {item.rentalStart} → {item.rentalEnd}</small>
                          )}
                        </div>
                        <b>₹{item.price}</b>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-bottom">
                    <span>Address: {ord.deliveryAddress}</span>
                    <strong>Total Paid: ₹{ord.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "My Rentals" && (
        <div className="dashboard-section">
          <h2>My Active & Past Rentals ({rentals.length})</h2>
          {rentals.length === 0 ? (
            <p className="empty-note">No rentals booked yet. Visit the Rent section to choose dates for designer outfits!</p>
          ) : (
            <div className="rentals-list">
              {rentals.map((ren) => {
                const returnDate = new Date(ren.end);
                const now = new Date();
                const diffDays = Math.ceil((returnDate - now) / (1000 * 60 * 60 * 24));
                const daysRemaining = diffDays > 0 ? diffDays : 0;

                return (
                  <div className="rental-card-row" key={ren.id}>
                    <img src={ren.image} alt={ren.title} />
                    <div className="rental-card-info">
                      <h3>{ren.title}</h3>
                      <p>Owner: {ren.sellerName} · Category: {ren.category}</p>
                      <div className="rental-dates-badge">
                        🗓️ {ren.start} to {ren.end} ({ren.duration} days)
                      </div>
                    </div>

                    <div className="rental-card-status">
                      <div className="days-left-box">
                        <strong>{daysRemaining} Days Left</strong>
                        <small>Return due on {ren.end}</small>
                      </div>
                      <span className="status-pill mode-rent">{ren.status}</span>
                      <b>Total Charge: ₹{ren.totalCost}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "Wishlist" && (
        <div className="dashboard-section">
          <h2>My Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? (
            <p className="empty-note">Your wishlist is empty. Click the heart icon on any product to save it here!</p>
          ) : (
            <div className="products">
              {wishlist.map((item) => (
                <div className="product-card-v2" key={item.id} onClick={() => onOpenDetail(item)}>
                  <div className="product-image-box">
                    <img src={item.image} alt={item.title} className="product-photo" />
                  </div>
                  <div className="product-card-info">
                    <h3>{item.title}</h3>
                    <b>₹{item.price}</b>
                    <button
                      className="sell-primary full-width"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "Recently Viewed" && (
        <div className="dashboard-section">
          <h2>Recently Viewed Products</h2>
          {recentlyViewed.length === 0 ? (
            <p className="empty-note">No recently viewed items yet. Browse the shop to populate this list.</p>
          ) : (
            <div className="products">
              {recentlyViewed.map((item) => (
                <div className="product-card-v2" key={item.id} onClick={() => onOpenDetail(item)}>
                  <div className="product-image-box">
                    <img src={item.image} alt={item.title} className="product-photo" />
                  </div>
                  <div className="product-card-info">
                    <h3>{item.title}</h3>
                    <b>₹{item.price}</b>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "Recycle History" && (
        <div className="dashboard-section">
          <h2>Recycle & Donation Requests ({recycleRequests.length})</h2>
          {recycleRequests.length === 0 ? (
            <p className="empty-note">No recycle requests submitted yet. Visit the Recycle section to schedule a pickup!</p>
          ) : (
            <div className="recycle-requests-list">
              {recycleRequests.map((req) => (
                <div className="recycle-card" key={req.id}>
                  <img src={req.image} alt={req.title} />
                  <div className="recycle-info">
                    <h3>Request #{req.id}</h3>
                    <p>Item: {req.title} · Condition: {req.condition}</p>
                    <p>Destination: <strong>{req.destination}</strong> · Pickup Date: <strong>{req.pickupDate}</strong></p>
                    <div className="timeline-mini">
                      {req.timeline.map((t, i) => (
                        <span key={i} className={`time-step ${t.done ? "done" : ""}`}>
                          {t.done ? "✓" : "○"} {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="recycle-status">
                    <span className="status-pill">{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "buyer" && activeTab === "Notifications" && (
        <div className="dashboard-section">
          <div className="notifications-header">
            <h2>Notifications ({notifications.length})</h2>
            <button className="sell-secondary" onClick={markNotificationsRead}>Mark All as Read</button>
          </div>

          <div className="notifications-list">
            {notifications.map((n) => (
              <div className={`notif-card ${n.read ? "read" : "unread"}`} key={n.id}>
                <div className="notif-icon">{n.icon}</div>
                <div>
                  <h4>{n.title}</h4>
                  <p>{n.message}</p>
                  <small>{n.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SELLER DASHBOARD TABS ---------------- */}

      {role === "seller" && activeTab === "Seller Overview" && (
        <div className="dashboard-section">
          <h2 className="section-subheading">🏪 Seller Dashboard Metrics — {activeSeller.name}</h2>
          <div className="stats-grid">
            <div className="stat-card-v2">
              <div className="stat-icon">💰</div>
              <span className="stat-label">Total Store Revenue</span>
              <h2>₹{sellerStats.totalRevenue.toLocaleString()}</h2>
              <small>From sales + rental earnings</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">🛍️</div>
              <span className="stat-label">Active Listings</span>
              <h2>{sellerStats.activeListings} Products</h2>
              <small>Live on Marketplace</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">📦</div>
              <span className="stat-label">Total Sales Orders</span>
              <h2>{sellerStats.ordersCount} Orders</h2>
              <small>Fulfilled / Pending</small>
            </div>

            <div className="stat-card-v2">
              <div className="stat-icon">🗓️</div>
              <span className="stat-label">Rental Bookings</span>
              <h2>{sellerStats.rentalsCount} Bookings</h2>
              <small>Active & Completed rentals</small>
            </div>
          </div>

          <div className="seller-quick-actions" style={{ marginTop: 24 }}>
            <button className="sell-primary" onClick={() => setPage("Upload")}>
              + Upload New Product Listing
            </button>
          </div>
        </div>
      )}

      {role === "seller" && activeTab === "My Inventory" && (
        <div className="dashboard-section">
          <h2>My Active Inventory ({sellerStats.sellerProducts.length} Items)</h2>
          <div className="products">
            {sellerStats.sellerProducts.length === 0 ? (
              <p className="empty-note">You haven't listed any products yet. Click Upload to list your first clothing item!</p>
            ) : (
              sellerStats.sellerProducts.map((item) => (
                <div className="product-card-v2" key={item.id}>
                  <div className="product-image-box">
                    <img src={item.image} alt={item.title} className="product-photo" />
                  </div>
                  <div className="product-card-info">
                    <small>{item.category} · {item.condition}</small>
                    <h3>{item.title}</h3>
                    <b>₹{item.price}</b>
                    <span className="status-pill">{item.mode.toUpperCase()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {role === "seller" && activeTab === "Sales Orders" && (
        <div className="dashboard-section">
          <h2>Customer Sales Orders ({sellerStats.sellerOrders.length})</h2>
          {sellerStats.sellerOrders.length === 0 ? (
            <p className="empty-note">No sales orders received yet.</p>
          ) : (
            <div className="orders-list">
              {sellerStats.sellerOrders.map((ord) => (
                <div key={ord.id} className="order-row-card">
                  <div>
                    <h4>Order #{ord.id}</h4>
                    <p>Buyer: {ord.buyerName} · Date: {new Date(ord.placedAt).toLocaleDateString()}</p>
                  </div>
                  <b>₹{ord.total}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {role === "seller" && activeTab === "Rental Bookings" && (
        <div className="dashboard-section">
          <h2>Rental Bookings Received ({sellerStats.sellerRentals.length})</h2>
          {sellerStats.sellerRentals.length === 0 ? (
            <p className="empty-note">No rental bookings received yet.</p>
          ) : (
            <div className="rentals-list">
              {sellerStats.sellerRentals.map((r) => (
                <div key={r.id} className="rental-card-row">
                  <img src={r.image} alt={r.title} />
                  <div>
                    <h4>{r.title}</h4>
                    <p>Booked: {r.start} to {r.end} ({r.duration} Days)</p>
                  </div>
                  <b>Earned: ₹{r.totalCost}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
