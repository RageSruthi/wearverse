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
        <span className="label">YOUR CIRCULAR BAG</span>
        <h1>Shopping Cart ({cart.length} items)</h1>
        <p>Review items for resale purchase or rental dates before demo checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <div className="cart-empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Explore thousands of sustainable fashion pieces or rental outfits in our marketplace.</p>
          <div className="empty-cart-actions">
            <button className="sell-primary" onClick={() => setPage("Shop")}>
              Explore Shop →
            </button>
            <button className="sell-secondary" onClick={() => setPage("Rent")}>
              Browse Rentals →
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-column">
            {/* Resale Buy Items */}
            {buyItems.length > 0 && (
              <div className="cart-section-box">
                <h3>🛍️ Resale Purchase Items ({buyItems.length})</h3>
                <div className="cart-items-list">
                  {buyItems.map((item) => (
                    <div className="cart-card-item" key={item.cartItemId || item.id}>
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p className="item-meta">
                          Category: {item.category} · Size: <strong>{item.selectedSize || "M"}</strong> · Condition: {item.condition}
                        </p>
                        <p className="seller-meta">Seller: {item.sellerName || "WearVerse Seller"}</p>

                        <div className="item-actions-row">
                          <button className="try-on-cart-btn" onClick={() => onOpenTryOn(item)}>
                            📷 Try On This Outfit
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-price-col">
                        <b>₹{item.price * (item.quantity || 1)}</b>

                        <div className="quantity-controls">
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, (item.quantity || 1) - 1)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, (item.quantity || 1) + 1)}>+</button>
                        </div>

                        <button className="remove-item-btn" onClick={() => removeFromCart(item.cartItemId || item.id)}>
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
              <div className="cart-section-box">
                <h3>🗓️ Rental Wardrobe Reservations ({rentalItems.length})</h3>
                <div className="cart-items-list">
                  {rentalItems.map((item) => (
                    <div className="cart-card-item rental-card-item" key={item.cartItemId || item.id}>
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p className="item-meta">
                          Size: <strong>{item.selectedSize || "M"}</strong> · Duration: <strong>{item.rentalDuration || 5} Days</strong>
                        </p>
                        <div className="rental-dates-tag">
                          🗓️ Reserved: <strong>{item.rentalStart}</strong> → <strong>{item.rentalEnd}</strong>
                        </div>
                        <p className="seller-meta">Owner: {item.sellerName || "WearVerse Seller"}</p>

                        <div className="item-actions-row">
                          <button className="try-on-cart-btn" onClick={() => onOpenTryOn(item)}>
                            📷 Try On Outfit
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-price-col">
                        <b>₹{item.rentalTotal || item.price}</b>
                        <small className="rental-charge-label">Total Rental Charge</small>

                        <button className="remove-item-btn" onClick={() => removeFromCart(item.cartItemId || item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="clear-cart-link" onClick={clearCart}>
              🗑️ Clear Entire Cart
            </button>
          </div>

          {/* Cart Summary Column */}
          <div className="cart-summary-column">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Resale Items Subtotal</span>
                <span>₹{buySubtotal}</span>
              </div>

              {rentalSubtotal > 0 && (
                <div className="summary-row">
                  <span>Rental Fees & Deposits</span>
                  <span>₹{rentalSubtotal}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Standard Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="green-text">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              {ecoDiscount > 0 && (
                <div className="summary-row green-text">
                  <span>Eco-Discount (Orders &gt; ₹1500)</span>
                  <span>-₹{ecoDiscount}</span>
                </div>
              )}

              <div className="summary-row grand-total-row">
                <span>Total Amount</span>
                <strong>₹{grandTotal}</strong>
              </div>

              <button className="sell-primary full-width checkout-btn" onClick={() => setShowCheckoutModal(true)}>
                Proceed to Checkout (₹{grandTotal}) →
              </button>

              <div className="cart-eco-perk">
                🌿 Shopping on WearVerse saves an estimated <strong>{(cart.length * 2700).toLocaleString()}L of water</strong>.
              </div>
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
