// src/RentalCalendar.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";
import { rentalService } from "./mockServices";

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RentalCalendar({ item, onClose, onRentalConfirmed }) {
  const { addToCart } = useStore();

  const [duration, setDuration] = useState(5); // 3, 5, 7, 10, 15, 30
  const [startDate, setStartDate] = useState(() => formatDate(new Date(Date.now() + 86400000)));
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const todayStr = formatDate(new Date());

  // Calculate return date dynamically based on start date and duration
  const startD = startDate ? new Date(startDate) : new Date();
  const returnD = new Date(startD);
  returnD.setDate(returnD.getDate() + Number(duration));
  const endDateStr = formatDate(returnD);

  const pricing = rentalService.calculateRental({
    dailyRate: item.rentalPrice || Math.round(item.price * 0.12),
    days: Number(duration),
  });

  function handleStartDateChange(newDate) {
    setStartDate(newDate);
    setError("");

    const reqEnd = new Date(newDate);
    reqEnd.setDate(reqEnd.getDate() + Number(duration));

    const avail = rentalService.checkAvailability(item, newDate, formatDate(reqEnd));
    setIsAvailable(avail);
    if (!avail) {
      setError("This item is reserved for some of the selected dates. Please try another start date.");
    }
  }

  function handleDurationChange(newDur) {
    setDuration(Number(newDur));
    setError("");

    const reqEnd = new Date(startDate);
    reqEnd.setDate(reqEnd.getDate() + Number(newDur));

    const avail = rentalService.checkAvailability(item, startDate, formatDate(reqEnd));
    setIsAvailable(avail);
    if (!avail) {
      setError("This duration overlaps with an existing booking. Please try another duration or date.");
    }
  }

  function confirmRental() {
    if (!isAvailable || error) return;

    addToCart(productWithRental, {
      mode: "rent",
      rentalDuration: duration,
      rentalStart: startDate,
      rentalEnd: endDateStr,
      rentalTotal: pricing.total,
    });

    setConfirmed(true);
  }

  const productWithRental = {
    ...item,
    rentalStart: startDate,
    rentalEnd: endDateStr,
    rentalDuration: duration,
    rentalTotal: pricing.total,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rental-calendar-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        {!confirmed ? (
          <>
            <div className="rental-header">
              <span className="label">RENTAL WARDROBE BOOKING</span>
              <h2>{item.title}</h2>
              <p>Select your rental period — return date and total fees update dynamically.</p>
            </div>

            <div className="rental-item-preview">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>Owner: <strong>{item.sellerName}</strong> · Location: {item.location}</p>
                <div className="rate-badge">₹{item.rentalPrice || Math.round(item.price * 0.12)} / day rate</div>
              </div>
            </div>

            {/* Duration Presets */}
            <div className="duration-selector">
              <label>Select Rental Duration:</label>
              <div className="duration-chips">
                {[3, 5, 7, 10, 15, 30].map((d) => (
                  <button
                    key={d}
                    className={`dur-chip ${duration === d ? "active" : ""}`}
                    onClick={() => handleDurationChange(d)}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Dates Selection */}
            <div className="date-picker-grid">
              <label>
                📅 Start Date (Pickup/Delivery)
                <input
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                />
              </label>

              <label>
                🔄 Calculated Return Date
                <input type="text" disabled value={formatDisplay(endDateStr)} />
              </label>
            </div>

            {error && <div className="modal-error">{error}</div>}

            {/* Pricing Breakdown */}
            <div className="rental-pricing-breakdown">
              <h4>Rental Cost Breakdown</h4>
              <div className="breakdown-row">
                <span>Daily Rental ({duration} days × ₹{item.rentalPrice || Math.round(item.price * 0.12)})</span>
                <span>₹{pricing.subtotal}</span>
              </div>
              <div className="breakdown-row">
                <span>Refundable Security Deposit</span>
                <span>₹{pricing.deposit}</span>
              </div>
              <div className="breakdown-row">
                <span>WearVerse Sanitization & Protection Fee</span>
                <span>₹{pricing.serviceFee}</span>
              </div>
              <div className="breakdown-row total-row">
                <span>Total Rental Charge</span>
                <strong>₹{pricing.total}</strong>
              </div>
            </div>

            <div className="rental-modal-actions">
              <button
                className="sell-primary full-width"
                disabled={!isAvailable || !!error}
                onClick={confirmRental}
              >
                Confirm Rental Booking (₹{pricing.total}) →
              </button>
              <button className="sell-secondary full-width" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Rental Reserved Successfully!</h2>
            <p>
              <strong>{item.title}</strong> is reserved from <strong>{formatDisplay(startDate)}</strong> to <strong>{formatDisplay(endDateStr)}</strong> ({duration} days).
            </p>
            <p className="sub-note">Added to your cart for checkout.</p>
            <button
              className="sell-primary full-width"
              onClick={() => {
                onClose();
                if (onRentalConfirmed) onRentalConfirmed();
              }}
            >
              Go to Cart & Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
