// src/Cart.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";
import CheckoutModal from "./CheckoutModal";

export default function Cart({ setPage, onOpenTryOn, onOpenOrderTracking }) {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const buyItems = cart.filter((i) => i.selectedMode !== "rent" && !i.rentalStart);
  const rentalItems = cart.filter((i) => i.selectedMode === "rent" || i.rentalStart);

  const buySubtotal = buyItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const rentalSubtotal = rentalItems.reduce((sum, item) => sum + (item.rentalTotal || item.price) * (item.quantity || 1), 0);
  const subtotal = buySubtotal + rentalSubtotal;
  const deliveryFee = cart.length > 0 ? (subtotal > 999 ? 0 : 79) : 0;
  const ecoDiscount = subtotal > 1500 ? 100 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - ecoDiscount);

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">YOUR CIRCULAR BAG & CHECKOUT</span>
        <h1>Shopping Cart & Order Summary ({cart.length} items)</h1>
        <p>Review items, select your preferred payment mode (UPI, COD, Card), and track assigned delivery agents.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-box" style={{ padding: "60px", textAlign: "center", background: "#ffffff", borderRadius: "18px", border: "1px solid #e1ebe4" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛍️</div>
          <h2 style={{ margin: "0 0 8px" }}>Your cart is empty</h2>
          <p style={{ color: "#666", marginBottom: "24px" }}>Explore thousands of sustainable fashion pieces or rental outfits in our marketplace.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button className="primary" onClick={() => setPage("Shop")}>
              Explore Shop →
            </button>
            <button className="secondary" onClick={() => setPage("Rent")}>
              Browse Rentals →
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "28px" }}>
          {/* Cart Items List */}
          <div className="cart-items-column">
            {/* Resale Buy Items */}
            {buyItems.length > 0 && (
              <div className="cart-section-box" style={{ background: "white", padding: "20px", borderRadius: "16px", marginBottom: "20px", border: "1px solid #e1ebe4" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: "16px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>🛍️ Resale Purchase Items ({buyItems.length})</h3>
                <div className="cart-items-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {buyItems.map((item) => (
                    <div className="cart-card-item" key={item.cartItemId || item.id} style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: "1px solid #f5f5f5", paddingBottom: "16px" }}>
                      <img src={item.image} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 4px", fontSize: "14px" }}>{item.title}</h4>
                        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Size: <strong>{item.selectedSize || "M"}</strong> · Condition: {item.condition}</p>
                        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#174d39" }}>Sold by {item.sellerName || "WearVerse Seller"}</p>
                        <button className="secondary" onClick={() => onOpenTryOn(item)} style={{ marginTop: "8px", padding: "4px 10px", fontSize: "11px" }}>
                          📷 Try On
                        </button>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <b style={{ fontSize: "16px", color: "#174d39", display: "block" }}>₹{item.price * (item.quantity || 1)}</b>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "6px 0" }}>
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, (item.quantity || 1) - 1)} style={{ padding: "2px 8px" }}>-</button>
                          <span style={{ fontSize: "13px", fontWeight: "bold" }}>{item.quantity || 1}</span>
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, (item.quantity || 1) + 1)} style={{ padding: "2px 8px" }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.cartItemId || item.id)} style={{ color: "#e53e3e", background: "none", border: "none", fontSize: "11px", cursor: "pointer" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Items */}
            {rentalItems.length > 0 && (
              <div className="cart-section-box" style={{ background: "white", padding: "20px", borderRadius: "16px", marginBottom: "20px", border: "1px solid #e1ebe4" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: "16px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>🗓️ Rental Wardrobe Reservations ({rentalItems.length})</h3>
                <div className="cart-items-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {rentalItems.map((item) => (
                    <div className="cart-card-item" key={item.cartItemId || item.id} style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: "1px solid #f5f5f5", paddingBottom: "16px" }}>
                      <img src={item.image} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 4px", fontSize: "14px" }}>{item.title}</h4>
                        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Duration: <strong>{item.rentalDuration || 5} Days</strong></p>
                        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#174d39" }}>🗓️ {item.rentalStart} → {item.rentalEnd}</p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <b style={{ fontSize: "16px", color: "#174d39", display: "block" }}>₹{item.rentalTotal || item.price}</b>
                        <small style={{ fontSize: "10px", color: "#888" }}>Rental Fee</small>
                        <button onClick={() => removeFromCart(item.cartItemId || item.id)} style={{ display: "block", color: "#e53e3e", background: "none", border: "none", fontSize: "11px", cursor: "pointer", marginTop: "8px" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={clearCart} style={{ color: "#e53e3e", background: "none", border: "none", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
              🗑️ Clear Entire Cart
            </button>
          </div>

          {/* Cart Summary Column */}
          <div className="cart-summary-column">
            <div className="cart-summary-card" style={{ background: "white", padding: "24px", borderRadius: "18px", border: "1px solid #e1ebe4", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "18px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Transaction Breakdown</h3>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
                <span>Resale Items Subtotal</span>
                <span>₹{buySubtotal}</span>
              </div>

              {rentalSubtotal > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
                  <span>Rental Fees & Deposits</span>
                  <span>₹{rentalSubtotal}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: "#276749" }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              {ecoDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px", color: "#276749" }}>
                  <span>Eco-Discount</span>
                  <span>-₹{ecoDiscount}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #eee", paddingTop: "12px", margin: "16px 0", fontSize: "18px", fontWeight: "bold", color: "#174d39" }}>
                <span>Total Payable</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* Delivery Agent Connection Banner */}
              <div style={{ background: "#edf4ef", padding: "12px", borderRadius: "10px", marginBottom: "16px", fontSize: "12px", color: "#174d39" }}>
                🚚 <strong>Assigned Delivery Partner:</strong>
                <p style={{ margin: "4px 0 0", fontSize: "11px" }}>Ramesh Kumar (Express Eco-Courier) · 📞 +91 98765 12345</p>
              </div>

              <button className="primary" style={{ width: "100%", padding: "14px", fontSize: "15px" }} onClick={() => setShowCheckoutModal(true)}>
                Proceed to Payment (₹{grandTotal}) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          onOrderPlaced={(orderId) => {
            setShowCheckoutModal(false);
            if (setPage) setPage("Dashboard");
            if (onOpenOrderTracking) onOpenOrderTracking(orderId);
          }}
        />
      )}
    </div>
  );
}
