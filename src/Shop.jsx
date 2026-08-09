// src/Shop.jsx
import { useMemo, useState } from "react";
import { useStore } from "./StoreContext";
import { BRANDS, CATEGORIES, COLORS, CONDITIONS, MATERIALS, SIZES } from "./mockDataGenerator";
import { productService } from "./mockServices";

export default function Shop({ onOpenDetail, onOpenTryOn, onOpenRentalCalendar }) {
  const { products, addToCart, wishlist, toggleWishlist, recordView } = useStore();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [brand, setBrand] = useState("All");
  const [condition, setCondition] = useState("All");
  const [material, setMaterial] = useState("All");
  const [mode, setMode] = useState("all"); // 'all' | 'shop' | 'rent'
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(24);
  const [showFilters, setShowFilters] = useState(false);

  // Compute filtered products using decoupled productService
  const filteredProducts = useMemo(() => {
    return productService.search(products, {
      query,
      category,
      size,
      color,
      brand,
      condition,
      material,
      mode,
      maxPrice: Number(maxPrice),
      sortBy,
    });
  }, [products, query, category, size, color, brand, condition, material, mode, maxPrice, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSize("All");
    setColor("All");
    setBrand("All");
    setCondition("All");
    setMaterial("All");
    setMode("all");
    setMaxPrice(10000);
    setSortBy("relevance");
  }

  return (
    <div className="page">
      <div className="page-heading">
        <span className="label">CIRCULAR FASHION MARKETPLACE</span>
        <h1>Explore Catalog ({filteredProducts.length.toLocaleString()} Items)</h1>
        <p>Verified pre-loved, vintage, and rental clothing uploaded by real sellers across India.</p>
      </div>

      {/* Main Search & Control Toolbar */}
      <div className="shop-toolbar-v2">
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="shop-search-input"
            placeholder="Search frocks, sarees, denim jackets, silk, black dresses, FabIndia..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(24);
            }}
          />
          {query && (
            <button className="clear-search-btn" onClick={() => setQuery("")}>×</button>
          )}
        </div>

        <div className="toolbar-actions">
          <button
            className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            🎛️ Filters {category !== "All" || size !== "All" || color !== "All" || mode !== "all" ? "•" : ""}
          </button>

          <div className="sort-wrapper">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Quick Strip */}
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

      {/* Expanded Multi-Filter Panel */}
      {showFilters && (
        <div className="filter-drawer">
          <div className="filter-drawer-header">
            <h3>🎛️ Advanced Marketplace Filters</h3>
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
              <label>Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="All">All Sizes</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Color</label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="All">All Colors</option>
                {COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Brand</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="All">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
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

      {/* Product Cards Grid */}
      <div className="products">
        {filteredProducts.length === 0 && (
          <div className="no-results-box">
            <div className="no-res-icon">🔍</div>
            <h3>No products found matching your search or filters</h3>
            <p>Try clearing some filters or searching for terms like "frock", "saree", "denim", or "kurti".</p>
            <button className="sell-primary" onClick={resetFilters}>
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
                <span className="eco-score-chip">♻️ {item.sustainabilityScore}</span>
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
                <img src={item.image} alt={item.title} className="product-photo" loading="lazy" />

                {/* Hover Quick Actions */}
                <div className="quick-actions-overlay">
                  <button
                    className="quick-act-btn tryon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenTryOn) onOpenTryOn(item);
                    }}
                  >
                    📷 Try On
                  </button>
                  <button
                    className="quick-act-btn detail"
                    onClick={(e) => {
                      e.stopPropagation();
                      recordView(item);
                      if (onOpenDetail) onOpenDetail(item);
                    }}
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>

              <div className="product-card-info">
                <div className="category-row">
                  <small>{item.category} · {item.condition}</small>
                  <span className="rating-pill">★ {item.rating}</span>
                </div>

                <h3>{item.title}</h3>
                <p className="seller-byline">Sold by {item.sellerName} · {item.location}</p>

                <div className="price-mode-row">
                  <div>
                    <b>₹{item.price}</b>
                    {item.mode !== "shop" && (
                      <span className="rent-tag">or ₹{item.rentalPrice}/day</span>
                    )}
                  </div>
                  <span className={`status-pill mode-${item.mode}`}>{item.mode.toUpperCase()}</span>
                </div>

                <div className="card-buttons">
                  <button
                    className="sell-primary add-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, { mode: item.mode === "rent" ? "rent" : "shop" });
                    }}
                  >
                    Add to Cart
                  </button>
                  {item.mode !== "shop" && (
                    <button
                      className="sell-secondary rent-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenRentalCalendar) onOpenRentalCalendar(item);
                      }}
                    >
                      🗓️ Rent
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Load More Button */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="load-more-container">
          <p className="load-progress">
            Showing {displayedProducts.length} of {filteredProducts.length} items
          </p>
          <button
            className="sell-primary load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 24)}
          >
            Load More Products ({filteredProducts.length - displayedProducts.length} remaining) →
          </button>
        </div>
      )}
    </div>
  );
}
