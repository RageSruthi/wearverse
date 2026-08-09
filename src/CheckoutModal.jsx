// src/CheckoutModal.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function CheckoutModal({ onClose, onOrderPlaced }) {
  const { cart, placeOrder } = useStore();

  const [step, setStep] = useState("form"); // 'form' | 'success'
  const [createdOrder, setCreatedOrder] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [address, setAddress] = useState({
    fullName: "Sruthi R.",
    street: "123 Eco Fashion Avenue, Bandra West",
    city: "Mumbai",
    pincode: "400050",
    phone: "+91 98765 43210",
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.rentalTotal ?? item.price) * (item.quantity || 1), 0);
  const deliveryFee = subtotal > 999 ? 0 : 79;
  const total = subtotal + deliveryFee;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!address.fullName || !address.street || !address.city || !address.pincode) {
      alert("Please fill in your delivery address details.");
      return;
    }

    const order = placeOrder({
      total,
      paymentMethod,
      deliveryAddress: `${address.fullName}, ${address.street}, ${address.city} - ${address.pincode} (Ph: ${address.phone})`,
    });

    if (order) {
      setCreatedOrder(order);
      setStep("success");
    }
  }

  if (step === "success" && createdOrder) {
    return (
      <div className="modal-overlay">
        <div className="checkout-modal success-card">
          <div className="success-header">
            <div className="big-check-icon">✓</div>
            <h2>Demo Order Confirmed!</h2>
            <span className="order-id-badge">Order ID: #{createdOrder.id}</span>
          </div>

          <p className="success-msg">
            Thank you for shopping circular with WearVerse! Your order has been placed in our mock backend.
          </p>

          <div className="order-summary-box">
            <div className="summary-row">
              <span>Expected Delivery</span>
              <strong>{createdOrder.expectedDelivery}</strong>
            </div>
            <div className="summary-row">
              <span>Payment Method</span>
              <strong>{createdOrder.paymentMethod.toUpperCase()} (Demo)</strong>
            </div>
            <div className="summary-row">
              <span>Total Paid</span>
              <strong>₹{createdOrder.total}</strong>
            </div>
            <div className="summary-row">
              <span>Items Count</span>
              <strong>{createdOrder.items.length} item(s)</strong>
            </div>
          </div>

          <div className="success-actions">
            <button
              className="sell-primary full-width"
              onClick={() => {
                onClose();
                if (onOrderPlaced) onOrderPlaced(createdOrder.id);
              }}
            >
              🚚 Track Order Progress →
            </button>
            <button className="sell-secondary full-width" onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">×</button>

        <div className="checkout-header">
          <span className="label">SECURE CHECKOUT</span>
          <h2>Complete Your Order</h2>
        </div>

        {/* DEMO PAYMENT NOTICE */}
        <div className="demo-payment-banner">
          ⚠️ <strong>DEMO PAYMENT</strong> — NO REAL MONEY WILL BE CHARGED
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-form-grid">
          {/* Address Form */}
          <div className="form-section">
            <h3>1. Delivery Address</h3>
            <label>
              Full Name
              <input
                type="text"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              />
            </label>

            <label>
              Street Address & Landmark
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
            </label>

            <div className="form-row-2">
              <label>
                City
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </label>
              <label>
                Pincode
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                />
              </label>
            </div>

            <label>
              Phone Number
              <input
                type="text"
                required
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              />
            </label>
          </div>

          {/* Payment Method & Order Summary */}
          <div className="form-section">
            <h3>2. Demo Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "upi" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <div>
                  <strong>📱 UPI Payment (PhonePe / GPay / Paytm / Razorpay)</strong>
                  <small style={{ display: "block", color: "#666" }}>Instant demo UPI approval (user@upi)</small>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>💵 Cash on Delivery</span>
              </label>

              <label className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>💳 Credit / Debit Card</span>
              </label>

              <label className={`payment-option ${paymentMethod === "wallet" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                />
                <span>🛍️ WearVerse EcoWallet (Demo Balance)</span>
              </label>
            </div>

            <div className="checkout-summary-box">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <strong>₹{total}</strong>
              </div>
            </div>

            <button
              type="submit"
              className="primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "900",
                background: "#174d39",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(23, 77, 57, 0.3)",
                marginTop: "16px",
              }}
            >
              PLACE ORDER (₹{total}) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
