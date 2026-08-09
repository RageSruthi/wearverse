// src/OrderTrackingModal.jsx
import { useStore } from "./StoreContext";

export default function OrderTrackingModal({ orderId, onClose }) {
  const { orders, advanceOrderStatus } = useStore();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="tracking-modal">
          <button className="modal-close-btn" onClick={onClose}>×</button>
          <h2>No Order Found</h2>
        </div>
      </div>
    );
  }

  const timelineSteps = [
    { title: "Order Placed", desc: "Your order was successfully received", icon: "📝" },
    { title: "Confirmed", desc: "Seller verified stock and availability", icon: "✓" },
    { title: "Packed", desc: "Eco-friendly packaging prepared", icon: "📦" },
    { title: "Shipped", desc: "Dispatched via WearVerse Express", icon: "🚚" },
    { title: "Out for Delivery", desc: "Courier is on the way to your location", icon: "🛵" },
    { title: "Delivered", desc: "Package delivered safely", icon: "🎉" },
  ];

  const currentStepIdx = timelineSteps.findIndex((s) => s.title === order.status);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close tracking">×</button>

        <div className="tracking-header">
          <span className="label">LIVE TRACKING</span>
          <h2>Order #{order.id}</h2>
          <span className="status-pill">{order.status}</span>
        </div>

        <div className="tracking-meta-grid">
          <div>
            <span className="meta-label">Expected Delivery</span>
            <strong>{order.expectedDelivery || "In 3-4 days"}</strong>
          </div>
          <div>
            <span className="meta-label">Payment Method</span>
            <strong>{order.paymentMethod.toUpperCase()} (Demo)</strong>
          </div>
          <div>
            <span className="meta-label">Total Paid</span>
            <strong>₹{order.total}</strong>
          </div>
          <div>
            <span className="meta-label">Delivery Address</span>
            <p>{order.deliveryAddress}</p>
          </div>
        </div>

        {/* Demo Advance Status Button */}
        <div className="demo-simulator-bar">
          <span>⚡ Demo Tool:</span>
          <button
            className="sim-btn"
            disabled={order.status === "Delivered"}
            onClick={() => advanceOrderStatus(order.id)}
          >
            {order.status === "Delivered" ? "✓ Package Delivered" : "Advance Order Status →"}
          </button>
        </div>

        {/* Timeline */}
        <div className="tracking-timeline">
          {timelineSteps.map((step, idx) => {
            const isCompleted = idx <= (currentStepIdx >= 0 ? currentStepIdx : 0);
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.title} className={`timeline-item ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}>
                <div className="timeline-node">
                  <span>{step.icon}</span>
                </div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ordered Items List */}
        <div className="tracking-items-section">
          <h3>Items in this Order</h3>
          <div className="items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="tracking-item-row">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <small>{item.category} · Sold by {item.sellerName || "WearVerse Seller"}</small>
                </div>
                <b>₹{item.price}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
