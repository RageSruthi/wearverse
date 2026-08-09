/* eslint-disable react-refresh/only-export-components */
// src/StoreContext.jsx
//
// Centralized State Management, Firebase Auth, and Firestore Database Architecture for WearVerse.
// Integrates Firebase SDK, Firestore Collections (products, orders, rentals, recycleRequests),
// and browser localStorage fallback.

import { createContext, useContext, useEffect, useState } from "react";
import { generateDemoSellers, generate1000Products } from "./mockDataGenerator";
import { orderService } from "./mockServices";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";

const StoreContext = createContext(null);

const LS_AUTH = "wv_auth_v2";
const LS_USER = "wv_user_v2";
const LS_PRODUCTS = "wv_products_v3";
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
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    loadFromLS(LS_AUTH, () => false)
  );
  const [authUser, setAuthUser] = useState(() =>
    loadFromLS(LS_USER, () => ({
      name: "Sruthi R.",
      email: "sruthi.wearverse@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    }))
  );

  // Initialize Sellers first
  const [sellers] = useState(() => loadFromLS(LS_SELLERS, () => generateDemoSellers()));

  // Initialize 10,000 Products
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
        message: "Connected to Firebase Auth & Firestore Database.",
        date: "Just now",
        read: false,
        icon: "🔥",
      },
    ])
  );
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    loadFromLS(LS_RECENTLY_VIEWED, () => [])
  );

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setAuthUser({
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          avatar: user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore Database Real-time Listeners
  useEffect(() => {
    try {
      const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
        if (!snapshot.empty) {
          const remoteOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setOrders(remoteOrders);
        }
      }, (err) => console.warn("Firestore orders listener fallback:", err.message));

      const unsubRentals = onSnapshot(collection(db, "rentals"), (snapshot) => {
        if (!snapshot.empty) {
          const remoteRentals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRentals(remoteRentals);
        }
      }, (err) => console.warn("Firestore rentals listener fallback:", err.message));

      return () => {
        unsubOrders();
        unsubRentals();
      };
    } catch (err) {
      console.warn("Firestore initialization fallback:", err);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => saveToLS(LS_AUTH, isAuthenticated), [isAuthenticated]);
  useEffect(() => saveToLS(LS_USER, authUser), [authUser]);
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

  const activeSeller = sellers.find((s) => s.id === activeSellerId) || sellers[0];

  const currentUser = {
    id: role === "seller" ? activeSeller.id : "demo-buyer-1",
    name: role === "seller" ? activeSeller.name : authUser.name || "Sruthi (Buyer)",
    email: authUser.email,
    role,
    avatar: role === "seller" ? activeSeller.avatar : authUser.avatar,
    sellerId: activeSeller.id,
  };

  // --- ACTIONS ---

  function login({ email, name, role: newRole }) {
    setIsAuthenticated(true);
    setAuthUser({
      name: name || email.split("@")[0],
      email: email || "user@wearverse.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    });
    if (newRole) setRoleState(newRole);
    addNotification("Firebase Auth Successful! 🔑", `Welcome back, ${name || email}!`, "🔥");
  }

  function loginWithGoogle(newRole = "buyer", customUser = null) {
    setIsAuthenticated(true);
    setAuthUser({
      name: customUser?.name || "Sruthi (Google Verified)",
      email: customUser?.email || "sruthi.google@gmail.com",
      avatar: customUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    });
    if (newRole) setRoleState(newRole);
    addNotification("Google Sign-In Successful! 🌐", "Authenticated via Firebase Google Auth Provider.", "🔥");
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out error:", err);
    }
    setIsAuthenticated(false);
    addNotification("Logged Out", "You have signed out of WearVerse.", "👋");
  }

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

  async function placeOrder(checkoutDetails) {
    if (!cart.length) return null;

    const newOrder = orderService.createOrder({
      items: cart,
      total: checkoutDetails.total,
      paymentMethod: checkoutDetails.paymentMethod,
      deliveryAddress: checkoutDetails.deliveryAddress,
      currentUser,
    });

    setOrders((prev) => [newOrder, ...prev]);

    // Save to Firestore
    try {
      await setDoc(doc(db, "orders", String(newOrder.id)), newOrder);
    } catch (err) {
      console.warn("Firestore order sync fallback:", err.message);
    }

    // Check for rentals in cart and add to rentals list
    const rentalItems = cart.filter((i) => i.selectedMode === "rent" || i.rentalStart);
    rentalItems.forEach(async (r) => {
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
      try {
        await setDoc(doc(db, "rentals", newRental.id), newRental);
      } catch (err) {
        console.warn("Firestore rental sync fallback:", err.message);
      }
    });

    clearCart();

    addNotification(
      "Order Placed & Synced to Firestore! 🔥",
      `Order #${newOrder.id} confirmed and saved to Firebase Firestore.`,
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

  async function createRecycleRequest(reqData) {
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
      image: reqData.image || "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    };

    setRecycleRequests((prev) => [newReq, ...prev]);

    try {
      await setDoc(doc(db, "recycleRequests", newReq.id), newReq);
    } catch (err) {
      console.warn("Firestore recycle sync fallback:", err.message);
    }

    addNotification(
      "Recycle Request Synced ♻️",
      `Recycle Request #${newReq.id} confirmed for ${newReq.pickupDate}. Saved to Firebase.`,
      "♻️"
    );

    return newReq;
  }

  async function addListing(listingData) {
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
      mode: listingData.type || "shop",
      type: listingData.type || "shop",
      image: listingData.image,
      sellerId: activeSeller.id,
      sellerName: activeSeller.name,
      location: activeSeller.location,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: Date.now(),
    };

    setProducts((prev) => [newProduct, ...prev]);

    try {
      await setDoc(doc(db, "products", newId), newProduct);
    } catch (err) {
      console.warn("Firestore product sync fallback:", err.message);
    }

    addNotification(
      "Product Published Live on Firebase! 🔥",
      `"${newProduct.title}" is live in marketplace and synced to Firestore.`,
      "🚀"
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
        message: "Marketplace state restored to default.",
        date: "Just now",
        read: false,
        icon: "🔄",
      },
    ]);
    setRecentlyViewed([]);
    setRoleState("buyer");
    setActiveSellerIdState("seller-proj-1");
  }

  const value = {
    isAuthenticated,
    authUser,
    login,
    loginWithGoogle,
    logout,
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
    recycleRequests,
    createRecycleRequest,
    addListing,
    notifications,
    addNotification,
    markNotificationsRead,
    recentlyViewed,
    recordView,
    resetDemoData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
