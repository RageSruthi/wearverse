// src/mockServices.js
//
// Decoupled API-like service layer that operates on mock local state.
// Makes replacing mock state with real HTTP API endpoints trivial in the future.

export const productService = {
  search(products, { query = "", category = "All", size = "All", color = "All", brand = "All", condition = "All", material = "All", mode = "all", minPrice = 0, maxPrice = 10000, sortBy = "relevance" }) {
    let filtered = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (size !== "All" && p.size !== size && !p.sizesAvailable?.includes(size)) return false;
      if (color !== "All" && p.color.toLowerCase() !== color.toLowerCase()) return false;
      if (brand !== "All" && p.brand !== brand) return false;
      if (condition !== "All" && p.condition !== condition) return false;
      if (material !== "All" && p.material !== material) return false;

      if (mode === "shop" && p.mode === "rent") return false;
      if (mode === "rent" && p.mode === "shop") return false;

      const pPrice = mode === "rent" ? p.rentalPrice : p.price;
      if (pPrice < minPrice || pPrice > maxPrice) return false;

      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const searchTarget = `${p.title} ${p.category} ${p.subcategory} ${p.color} ${p.material} ${p.brand} ${p.sellerName} ${p.tags ? p.tags.join(" ") : ""}`.toLowerCase();
        if (!searchTarget.includes(q)) return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => (mode === "rent" ? a.rentalPrice - b.rentalPrice : a.price - b.price));
        break;
      case "price_desc":
        filtered.sort((a, b) => (mode === "rent" ? b.rentalPrice - a.rentalPrice : b.price - a.price));
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        // Relevance / default
        break;
    }

    return filtered;
  },

  getById(products, id) {
    return products.find((p) => p.id === id) || null;
  },
};

export const orderService = {
  createOrder({ items, total, paymentMethod, deliveryAddress, currentUser }) {
    const orderId = `WV-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const estDelivery = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const newOrder = {
      id: orderId,
      placedAt: Date.now(),
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        price: item.rentalTotal ?? item.price,
        mode: item.selectedMode || item.mode || "shop",
        rentalStart: item.rentalStart || null,
        rentalEnd: item.rentalEnd || null,
        sellerId: item.sellerId,
        sellerName: item.sellerName,
      })),
      total,
      paymentMethod,
      deliveryAddress,
      buyerName: currentUser?.name || "Demo Buyer",
      status: "Confirmed",
      expectedDelivery: estDelivery,
      trackingTimeline: [
        { status: "Order Placed", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), completed: true },
        { status: "Confirmed", time: new Date(Date.now() + 10 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), completed: true },
        { status: "Packed", time: "Pending", completed: false },
        { status: "Shipped", time: "Pending", completed: false },
        { status: "Out for Delivery", time: "Pending", completed: false },
        { status: "Delivered", time: "Pending", completed: false },
      ],
    };

    return newOrder;
  },

  advanceStatus(order) {
    const statuses = ["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
    const currentIndex = statuses.indexOf(order.status);
    if (currentIndex >= 0 && currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      const updatedTimeline = order.trackingTimeline.map((t) => {
        if (t.status === nextStatus) {
          return { ...t, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), completed: true };
        }
        return t;
      });
      return { ...order, status: nextStatus, trackingTimeline: updatedTimeline };
    }
    return order;
  },
};

export const rentalService = {
  checkAvailability(product, startDate, endDate) {
    if (!product.rentBookings || !product.rentBookings.length) return true;
    const reqStart = new Date(startDate).getTime();
    const reqEnd = new Date(endDate).getTime();

    return !product.rentBookings.some((b) => {
      const bStart = new Date(b.start).getTime();
      const bEnd = new Date(b.end).getTime();
      return reqStart < bEnd && reqEnd > bStart;
    });
  },

  calculateRental({ dailyRate, days }) {
    const subtotal = dailyRate * days;
    const deposit = Math.round(subtotal * 0.2);
    const serviceFee = 49;
    return { subtotal, deposit, serviceFee, total: subtotal + deposit + serviceFee };
  },
};
