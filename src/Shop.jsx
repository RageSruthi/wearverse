// src/Shop.jsx
import { useMemo, useState } from "react";
import { useStore } from "./StoreContext";
import { CATEGORIES, CONDITIONS, MATERIALS, SIZES } from "./mockDataGenerator";

export default function Shop({ onOpenDetail }) {
  const { products, addToCart, wishlist, toggleWishlist, recordView } = useStore();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [condition, setCondition] = useState("All");
  const [material, setMaterial] = useState("All");
  const [mode, setMode] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(24);
  const [showFilters, setShowFilters] = useState(false);

  // Compute filtered products (Color section removed as requested)
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (size !== "All" && p.size !== size && !p.sizesAvailable?.includes(size)) return false;
      if (condition !== "All" && p.condition !== condition) return false;
      if (material !== "All" && p.material !== material) return false;

      if (mode === "shop" && p.mode === "rent") return false;
      if (mode === "rent" && p.mode === "shop") return false;

      const pPrice = mode === "rent" ? p.rentalPrice : p.price;
      if (pPrice > maxPrice) return false;

      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const searchTarget = `${p.title} ${p.category} ${p.subcategory} ${p.material} ${p.sellerName}`.toLowerCase();
        if (!searchTarget.includes(q)) return false;
      }

      return true;
    });

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => (mode === "rent" ? a.rentalPrice - b.rentalPrice : a.price - b.price));
        break;
      case "price_desc":
        result.sort((a, b) => (mode === "rent" ? b.rentalPrice - a.rentalPrice : b.price - a.price));
        break;
      case "newest":
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, query, category, size, condition, material, mode, maxPrice, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSize("All");
    setCondition("All");
    setMaterial("All");
    setMode("all");
    setMaxPrice(10000);
    setSortBy("relevance");
  }

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">SUSTAINABLE MARKETPLACE CATALOG</span>
        <h1>Explore Waredrobe ({filteredProducts.length.toLocaleString()} Items)</h1>
        <p>Verified pre-loved, vintage, and rental clothing uploaded by real sellers across India.</p>
      </div>

      {/* Search Bar & Toolbar */}
      <div className="shop-toolbar-v2">
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="shop-search-input"
            placeholder="Search frocks, sarees, denim jackets, silk, dresses..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(24);
            }}
          />
          {query && <button className="clear-search-btn" onClick={() => setQuery("")}>×</button>}
        </div>

        <div className="toolbar-actions">
          <button
            className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            🎛️ Filters {category !== "All" || condition !== "All" ? "•" : ""}
          </button>

          <div className="sort-wrapper">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="category-pills-row">
        <button
          className={`cat-pill ${category === "All" ? "active" : ""}`}
          onClick={() => {
            setCategory("All");
            setVisibleCount(24);
          }}
        >
          All Categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`cat-pill ${category === c ? "active" : ""}`}
            onClick={() => {
              setCategory(c);
              setVisibleCount(24);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Expanded Filters Drawer (Colors Section Removed) */}
      {showFilters && (
        <div className="filter-drawer">
          <div className="filter-drawer-header">
            <h3>🎛️ Marketplace Filters</h3>
            <button className="reset-link" onClick={resetFilters}>Reset All Filters</button>
          </div>

          <div className="filter-fields-grid">
            <div>
              <label>Availability Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="all">All (Buy & Rent)</option>
                <option value="shop">Buy / Resale Only</option>
                <option value="rent">Rent Available Only</option>
              </select>
            </div>

            <div>
              <label>Condition</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="All">All Conditions</option>
                {CONDITIONS.map((cd) => (
                  <option key={cd} value={cd}>{cd}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="All">All Sizes</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="All">All Materials</option>
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="price-slider-field">
              <label>Max Price: ₹{maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min="300"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="products">
        {filteredProducts.length === 0 && (
          <div className="no-results-box" style={{ gridColumn: "1 / -1", padding: "60px", textAlign: "center", background: "#ffffff", borderRadius: "16px", border: "1px solid #e1ebe4" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>No products found matching your search</h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>Try resetting filters or searching for terms like "frock", "saree", or "kurti".</p>
            <button className="primary" onClick={resetFilters}>
              Reset Filters & Search
            </button>
          </div>
        )}

        {displayedProducts.map((item) => {
          const wished = wishlist.some((w) => w.id === item.id);
          return (
            <div
              className="product-card-v2"
              key={item.id}
              onClick={() => {
                recordView(item);
                if (onOpenDetail) onOpenDetail(item);
              }}
            >
              <div className="product-image-box">
                <span className="badge-ai">✓ AI APPROVED</span>
                <button
                  className={`heart-btn ${wished ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  aria-label="Wishlist"
                >
                  {wished ? "♥" : "♡"}
                </button>
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-photo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>

              <div className="product-card-info">
                <div className="category-row">
                  <small>{item.category} · {item.condition}</small>
                  <span className="rating-pill">★ {item.rating}</span>
                </div>

                <h3>{item.title}</h3>
                <p className="seller-byline">Sold by {item.sellerName} · {item.location}</p>

                {/* Customer Reviews Snippet */}
                <div style={{ fontSize: "11px", color: "#666", margin: "6px 0", fontStyle: "italic" }}>
                  💬 "{item.reviews?.[0]?.comment || "Excellent condition and fast delivery!"}"
                </div>

                <div className="price-mode-row">
                  <div>
                    <b>₹{item.price}</b>
                    {item.mode !== "shop" && (
                      <span className="rent-tag">or ₹{item.rentalPrice}/day</span>
                    )}
                  </div>
                </div>

                <div className="card-buttons">
                  <button
                    className="primary add-cart-btn"
                    style={{ width: "100%" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, { mode: item.mode === "rent" ? "rent" : "shop" });
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Load More Button */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="load-more-container" style={{ marginTop: "32px", textAlign: "center" }}>
          <p className="load-progress" style={{ color: "#666", marginBottom: "12px" }}>
            Showing {displayedProducts.length} of {filteredProducts.length.toLocaleString()} items
          </p>
          <button
            className="primary load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 24)}
          >
            Load More Products ({filteredProducts.length - displayedProducts.length} remaining) →
          </button>
        </div>
      )}
    </div>
  );
}
