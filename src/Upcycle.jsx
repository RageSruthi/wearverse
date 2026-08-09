// src/Upcycle.jsx
import { useState } from "react";
import { useStore } from "./StoreContext";

export default function Upcycle() {
  const { addNotification } = useStore();
  const [requested, setRequested] = useState(false);
  const [upcycleForm, setUpcycleForm] = useState({
    clothingType: "Old Denim Jeans",
    targetItem: "Custom Tote Bag & Patchwork Jacket",
    notes: "Has slight tears on knees, rest of fabric is sturdy denim.",
  });

  const upcycledItems = [
    {
      id: "up-1",
      title: "Handcrafted Denim Patchwork Jacket",
      original: "Made from 3 repurposed denim jeans",
      price: 1899,
      artisan: "Studio Upcycle Mumbai",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      ecoScore: "100% Circular",
    },
    {
      id: "up-2",
      title: "Silk Saree Reusable Tote Bag",
      original: "Upcycled from pre-loved Banarasi saree",
      price: 649,
      artisan: "Kala Artisans Collective",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
      ecoScore: "Zero Waste",
    },
    {
      id: "up-3",
      title: "Quilted Vintage Cotton Vest",
      original: "Crafted from vintage floral dress scraps",
      price: 1299,
      artisan: "ReWear Studio",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      ecoScore: "Upcycled Fiber",
    },
    {
      id: "up-4",
      title: "Upcycled Denim Cushion Covers (Set of 2)",
      original: "Repurposed dark wash jeans fabric",
      price: 799,
      artisan: "EcoHome Collective",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      ecoScore: "Home Textiles",
    },
  ];

  function handleSubmitUpcycle(e) {
    e.preventDefault();
    setRequested(true);
    addNotification(
      "Upcycle Request Received ✂️",
      `Your request to upcycle "${upcycleForm.clothingType}" into "${upcycleForm.targetItem}" has been submitted to artisan partners.`,
      "✂️"
    );
  }

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">CIRCULAR CREATIVITY</span>
        <h1>Upcycle Studio</h1>
        <p>Transforming old, unwearable garments into high-value artisan fashion & accessories.</p>
      </div>

      {/* Upcycled Showcase Grid */}
      <h2 className="section-subheading">Artisan Upcycled Collection</h2>
      <div className="products">
        {upcycledItems.map((item) => (
          <div className="product" key={item.id}>
            <div className="product-image">
              <span className="badge">✂️ UPCYCLED ART</span>
              <img src={item.image} alt={item.title} className="product-photo" />
            </div>
            <div className="product-info">
              <small>{item.ecoScore} · {item.artisan}</small>
              <h3>{item.title}</h3>
              <p>{item.original}</p>
              <div className="price-row">
                <b>₹{item.price}</b>
                <span>Artisan Made</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Upcycling Request Form */}
      <div className="upcycle-request-card">
        <h2>✂️ Send Your Clothes to Our Upcycle Artisans</h2>
        <p>Have old clothes sitting in your closet? Let our verified partner artisans redesign them into custom tote bags, jackets, or home decor!</p>

        {!requested ? (
          <form onSubmit={handleSubmitUpcycle} className="upcycle-form">
            <div className="form-row-2">
              <label>
                What clothes are you sending?
                <input
                  type="text"
                  required
                  value={upcycleForm.clothingType}
                  onChange={(e) => setUpcycleForm({ ...upcycleForm, clothingType: e.target.value })}
                />
              </label>

              <label>
                What would you like it turned into?
                <select
                  value={upcycleForm.targetItem}
                  onChange={(e) => setUpcycleForm({ ...upcycleForm, targetItem: e.target.value })}
                >
                  <option>Custom Tote Bag & Patchwork Accent</option>
                  <option>Upcycled Patchwork Jacket</option>
                  <option>Quilted Cushion Covers</option>
                  <option>Artisan Laptop Sleeve</option>
                  <option>Let Artisan Decide</option>
                </select>
              </label>
            </div>

            <label>
              Special Notes / Preferences
              <textarea
                value={upcycleForm.notes}
                onChange={(e) => setUpcycleForm({ ...upcycleForm, notes: e.target.value })}
                placeholder="Tell us about the fabric, color preferences, or any specific requests..."
              />
            </label>

            <button type="submit" className="sell-primary">
              Submit Upcycling Request →
            </button>
          </form>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Upcycle Request Submitted!</h3>
            <p>Our artisan partners will inspect your request and send a doorstep pickup courier within 48 hours.</p>
            <button className="sell-secondary" onClick={() => setRequested(false)}>
              Send Another Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
