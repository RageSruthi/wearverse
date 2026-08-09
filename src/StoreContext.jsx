/* eslint-disable react-refresh/only-export-components */
// src/StoreContext.jsx
//
// Centralized State Management & Persisted Mock Backend Architecture for WearVerse.
// Stores Products, Sellers, Cart, Wishlist, Orders, Rentals, Recycle Requests,
// Notifications, and Active Role/User in browser localStorage.

import { createContext, useContext, useEffect, useState } from "react";
import { generateDemoSellers, generate1000Products } from "./mockDataGenerator";
import { orderService } from "./mockServices";

const StoreContext = createContext(null);

const LS_PRODUCTS = "wv_products_v2";
const LS_SELLERS = "wv_sellers_v2";
const LS_CART = "wv_cart_v2";
const LS_WISHLIST = "wv_wishlist_v2";
const LS_ROLE = "wv_role_v2";
const LS_ACTIVE_SELLER = "wv_active_seller_v2";
const LS_ORDERS = "wv_orders_v2";
const LS_RENTALS = "wv_rentals_v2";
const LS_RECYCLE = "wv_recycle_v2";
const LS_NOTIFICATIONS = "wv_notifications_v2";
const LS_RECENTLY_VIEWED = "wv_recently_viewed_v2";

function loadFromLS(key, fallbackFn) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackFn();
  } catch (err) {
    console.error(`Error loading ${key}:`, err);
    return fallbackFn();
  }
}

function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key}:`, err);
  }
}

export function StoreProvider({ children }) {
  // Initialize Sellers first
  const [sellers] = useState(() => loadFromLS(LS_SELLERS, () => generateDemoSellers()));

  // Initialize 1000+ Products
  const [products, setProducts] = useState(() =>
    loadFromLS(LS_PRODUCTS, () => generate1000Products(sellers))
  );

  const [cart, setCart] = useState(() => loadFromLS(LS_CART, () => []));
  const [wishlist, setWishlist] = useState(() => loadFromLS(LS_WISHLIST, () => []));
  const [role, setRoleState] = useState(() => loadFromLS(LS_ROLE, () => "buyer"));
  const [activeSellerId, setActiveSellerIdState] = useState(() =>
    loadFromLS(LS_ACTIVE_SELLER, () => "seller-proj-1")
  );

  const [orders, setOrders] = useState(() => loadFromLS(LS_ORDERS, () => []));
  const [rentals, setRentals] = useState(() => loadFromLS(LS_RENTALS, () => []));
  const [recycleRequests, setRecycleRequests] = useState(() =>
    loadFromLS(LS_RECYCLE, () => [])
  );
  const [notifications, setNotifications] = useState(() =>
    loadFromLS(LS_NOTIFICATIONS, () => [
      {
        id: "notif-1",
        title: "Welcome to WearVerse! ♻️",
        message: "Explore 1,000+ sustainable fashion listings, Virtual Try-On, rental wardrobe, and circular recycling.",
        date: "Just now",
        read: false,
        icon: "🌟",
      },
    ])
  );
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    loadFromLS(LS_RECENTLY_VIEWED, () => [])
  );

  // Sync to localStorage
  useEffect(() => saveToLS(LS_PRODUCTS, products), [products]);
  useEffect(() => saveToLS(LS_SELLERS, sellers), [sellers]);
  useEffect(() => saveToLS(LS_CART, cart), [cart]);
  useEffect(() => saveToLS(LS_WISHLIST, wishlist), [wishlist]);
  useEffect(() => saveToLS(LS_ROLE, role), [role]);
  useEffect(() => saveToLS(LS_ACTIVE_SELLER, activeSellerId), [activeSellerId]);
  useEffect(() => saveToLS(LS_ORDERS, orders), [orders]);
  useEffect(() => saveToLS(LS_RENTALS, rentals), [rentals]);
  useEffect(() => saveToLS(LS_RECYCLE, recycleRequests), [recycleRequests]);
  useEffect(() => saveToLS(LS_NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveToLS(LS_RECENTLY_VIEWED, recentlyViewed), [recentlyViewed]);

  // Current active seller object
  const activeSeller = sellers.find((s) => s.id === activeSellerId) || sellers[0];

  const currentUser = {
    id: role === "seller" ? activeSeller.id : "demo-buyer-1",
    name: role === "seller" ? activeSeller.name : "Sruthi (Buyer)",
    role,
    avatar: role === "seller" ? activeSeller.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    sellerId: activeSeller.id,
  };

  // --- ACTIONS ---

  function setRole(newRole) {
    setRoleState(newRole);
  }

  function setActiveSeller(sellerId) {
    setActiveSellerIdState(sellerId);
    setRoleState("seller");
  }

  function addNotification(title, message, icon = "🔔") {
    const notif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      message,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      icon,
    };
    setNotifications((prev) => [notif, ...prev]);
  }

  function markNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function addToCart(product, options = {}) {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedMode === (options.mode || product.mode)
      );

      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex].quantity = (copy[existingIndex].quantity || 1) + 1;
        return copy;
      }

      const cartItem = {
        ...product,
        quantity: 1,
        selectedSize: options.size || product.size || "M",
        selectedColor: options.color || product.color || "Default",
        selectedMode: options.mode || (product.mode === "rent" ? "rent" : "shop"),
        rentalDuration: options.rentalDuration || 5,
        rentalStart: options.rentalStart || null,
        rentalEnd: options.rentalEnd || null,
        rentalTotal: options.rentalTotal || null,
        cartItemId: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      };

      return [...prev, cartItem];
    });

    addNotification("Added to Cart", `"${product.title}" has been added to your cart.`, "🛒");
  }

  function removeFromCart(cartItemId) {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId && item.id !== cartItemId));
  }

  function updateCartQuantity(cartItemId, qty) {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId || item.id === cartItemId ? { ...item, quantity: qty } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(product) {
    let wasWished = false;
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      wasWished = exists;
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [product, ...prev];
      }
    });

    if (!wasWished) {
      addNotification("Saved to Wishlist", `"${product.title}" added to your wishlist.`, "♡");
    }
  }

  function placeOrder(checkoutDetails) {
    if (!cart.length) return null;

    const newOrder = orderService.createOrder({
      items: cart,
      total: checkoutDetails.total,
      paymentMethod: checkoutDetails.paymentMethod,
      deliveryAddress: checkoutDetails.deliveryAddress,
      currentUser,
    });

    setOrders((prev) => [newOrder, ...prev]);

    // Check for rentals in cart and add to rentals list
    const rentalItems = cart.filter((i) => i.selectedMode === "rent" || i.rentalStart);
    rentalItems.forEach((r) => {
      const newRental = {
        id: `rent-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        orderId: newOrder.id,
        productId: r.id,
        title: r.title,
        image: r.image,
        category: r.category,
        sellerName: r.sellerName,
        start: r.rentalStart || new Date().toISOString().slice(0, 10),
        end: r.rentalEnd || new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
        duration: r.rentalDuration || 5,
        totalCost: r.rentalTotal || r.rentalPrice * (r.rentalDuration || 5),
        status: "Booked",
        bookedAt: Date.now(),
      };
      setRentals((prev) => [newRental, ...prev]);
    });

    clearCart();

    addNotification(
      "Order Placed Successfully! 🎉",
      `Order #${newOrder.id} confirmed. Tracking is now available on your Dashboard.`,
      "📦"
    );

    return newOrder;
  }

  function advanceOrderStatus(orderId) {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated = orderService.advanceStatus(ord);
          addNotification(
            `Order Status Update`,
            `Order #${ord.id} is now ${updated.status}.`,
            "🚚"
          );
          return updated;
        }
        return ord;
      })
    );
  }

  function bookRental(productId, booking) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, rentBookings: [...(p.rentBookings || []), booking] }
          : p
      )
    );
  }

  function createRecycleRequest(reqData) {
    const newReq = {
      id: `wv-recycle-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: Date.now(),
      title: reqData.title || "Garment Recycling Request",
      category: reqData.category || "Apparel",
      condition: reqData.condition || "Severely Damaged",
      destination: reqData.destination || "Recycle",
      pickupDate: reqData.pickupDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString(),
      address: reqData.address || "Demo Pickup Address",
      status: "Submitted",
      timeline: [
        { label: "Submitted", time: "Just now", done: true },
        { label: "Pickup Scheduled", time: "Pending", done: false },
        { label: "Collected", time: "Pending", done: false },
        { label: "Sorted & Graded", time: "Pending", done: false },
        { label: "Destination Assigned", time: "Pending", done: false },
        { label: "Completed", time: "Pending", done: false },
      ],
      image: reqData.image || "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    };

    setRecycleRequests((prev) => [newReq, ...prev]);

    addNotification(
      "Recycle Pickup Scheduled ♻️",
      `Recycle Request #${newReq.id} confirmed for ${newReq.pickupDate}. Target destination: ${newReq.destination}.`,
      "♻️"
    );

    return newReq;
  }

  function addListing(listingData) {
    const newId = `prod-upload-${Date.now()}`;
    const newProduct = {
      id: newId,
      title: listingData.title || "Uploaded Garment",
      category: listingData.category || "Dresses",
      subcategory: listingData.subcategory || listingData.category,
      color: listingData.color || "Multi",
      material: listingData.material || "Cotton",
      brand: listingData.brand || "Own Design",
      size: listingData.size || "M",
      sizesAvailable: [listingData.size || "M"],
      condition: listingData.condition || "Good",
      price: Number(listingData.price) || 499,
      originalPrice: (Number(listingData.price) || 499) * 1.5,
      rentalPrice: listingData.rentalPrice ? Number(listingData.rentalPrice) : Math.round((Number(listingData.price) || 499) * 0.15),
      deposit: Math.round((Number(listingData.price) || 499) * 0.2),
      mode: listingData.type || "shop",
      type: listingData.type || "shop",
      image: listingData.image,
      images: listingData.images || [listingData.image],
      sellerId: activeSeller.id,
      sellerName: activeSeller.name,
      sellerAvatar: activeSeller.avatar,
      sellerRating: activeSeller.rating,
      location: activeSeller.location,
      rating: 5.0,
      reviewsCount: 1,
      qualityScore: 92,
      sustainabilityScore: 95,
      waterSaved: 2400,
      co2Saved: 8.5,
      tags: [listingData.category.toLowerCase(), listingData.type],
      createdAt: Date.now(),
      rentBookings: [],
    };

    setProducts((prev) => [newProduct, ...prev]);

    addNotification(
      "Product Published Live! 🚀",
      `"${newProduct.title}" is now published and searchable in the marketplace under ${newProduct.mode.toUpperCase()}.`,
      "✨"
    );

    return newProduct;
  }

  function recordView(product) {
    if (!product) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  }

  function resetDemoData() {
    localStorage.clear();
    const defaultSellers = generateDemoSellers();
    const defaultProducts = generate1000Products(defaultSellers);

    setProducts(defaultProducts);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setRentals([]);
    setRecycleRequests([]);
    setNotifications([
      {
        id: "notif-reset",
        title: "Demo Data Reset Completed 🔄",
        message: "All marketplace listings, orders, rentals, and cart data restored to default demo state.",
        date: "Just now",
        read: false,
        icon: "🔄",
      },
    ]);
    setRecentlyViewed([]);
    setRoleState("buyer");
    setActiveSellerIdState("seller-proj-1");
  }

  // --- STATS COMPUTATION ---

  function getBuyerStats() {
    const clothesReused = orders.reduce((sum, o) => sum + o.items.length, 0) + rentals.length + recycleRequests.length;
    return {
      points: clothesReused * 25 + wishlist.length * 5,
      clothesReused,
      waterSaved: clothesReused * 2700,
      co2Saved: clothesReused * 8.4,
    };
  }

  function getSellerStats(sId = activeSeller.id) {
    const sellerProducts = products.filter((p) => p.sellerId === sId);
    const sellerOrders = orders.filter((o) => o.items.some((i) => i.sellerId === sId));
    const sellerRentals = rentals.filter((r) => sellerProducts.some((p) => p.id === r.productId));

    const totalRevenue = sellerOrders.reduce((sum, o) => {
      const sellerItems = o.items.filter((i) => i.sellerId === sId);
      return sum + sellerItems.reduce((s, item) => s + item.price, 0);
    }, 0) + sellerRentals.reduce((sum, r) => sum + r.totalCost, 0);

    return {
      totalProducts: sellerProducts.length,
      activeListings: sellerProducts.length,
      ordersCount: sellerOrders.length,
      rentalsCount: sellerRentals.length,
      totalRevenue,
      sellerProducts,
      sellerOrders,
      sellerRentals,
    };
  }

  const value = {
    products,
    sellers,
    activeSeller,
    currentUser,
    role,
    setRole,
    activeSellerId,
    setActiveSeller,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    wishlist,
    toggleWishlist,
    orders,
    placeOrder,
    advanceOrderStatus,
    rentals,
    bookRental,
    recycleRequests,
    createRecycleRequest,
    addListing,
    notifications,
    addNotification,
    markNotificationsRead,
    recentlyViewed,
    recordView,
    resetDemoData,
    getBuyerStats,
    getSellerStats,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
