// src/mockDataGenerator.js
// Deterministically generates 30 Demo Sellers and 1,000+ Realistic Demo Products.

export const CATEGORIES = [
  "Dresses",
  "Shirts",
  "T-Shirts",
  "Jeans",
  "Jackets",
  "Sarees",
  "Kurtis",
  "Skirts",
  "Shorts",
  "Hoodies",
  "Co-ords",
  "Ethnic Wear",
  "Activewear",
  "Blazers",
];

export const SUBCATEGORIES = {
  Dresses: ["Summer Frock", "Maxi Dress", "Bodycon Dress", "A-Line Dress", "Wrap Dress", "Cocktail Dress"],
  Shirts: ["Casual Linen Shirt", "Formal Cotton Shirt", "Oversized Denim Shirt", "Printed Hawaiian Shirt", "Oxford Shirt"],
  "T-Shirts": ["Graphic Print Tee", "Classic Crewneck", "Oversized Vintage Tee", "V-Neck Tee", "Polo T-Shirt"],
  Jeans: ["Slim Fit Denim", "Wide Leg Jeans", "Mom Jeans", "High-Waist Distressed", "Straight Cut Jeans"],
  Jackets: ["Classic Denim Jacket", "Leather Biker Jacket", "Puffer Jacket", "Bomber Jacket", "Fleece Zip Jacket"],
  Sarees: ["Handloom Silk Saree", "Banarasi Brocade Saree", "Chiffon Floral Saree", "Kanjeevaram Silk", "Cotton Mulmul Saree"],
  Kurtis: ["Printed Rayon Kurti", "Anarkali Kurti", "Straight Chikankari Kurti", "Short Denim Kurti", "A-Line Kurti"],
  Skirts: ["Pleated Midi Skirt", "Denim Mini Skirt", "A-Line Floral Skirt", "Wrap Long Skirt", "Tiered Maxi Skirt"],
  Shorts: ["High-Waisted Denim Shorts", "Linen Casual Shorts", "Cargo Shorts", "Athletic Running Shorts"],
  Hoodies: ["Oversized Fleece Hoodie", "Cropped Hoodie", "Zip-Up Sweatshirt", "Tie-Dye Hoodie"],
  "Co-ords": ["Pastel Linen Co-ord Set", "Printed Satin Co-ord", "Knit Lounge Co-ord", "Blazer & Shorts Set"],
  "Ethnic Wear": ["Embroidered Festive Anarkali", "Lehenga Choli Set", "Silk Kurta Pajama", "Indo-Western Gown"],
  Activewear: ["Seamless Yoga Set", "Performance Running Tights", "Sports Crop Top", "Track Jacket"],
  Blazers: ["Oversized Structured Blazer", "Double-Breasted Blazer", "Cropped Linen Blazer", "Velvet Evening Blazer"],
};

export const COLORS = ["Black", "Blue", "Red", "Pink", "White", "Green", "Yellow", "Navy", "Pastel", "Maroon", "Beige", "Gold", "Purple", "Olive"];
export const MATERIALS = ["Cotton", "Denim", "Silk", "Linen", "Rayon", "Wool", "Polyester", "Chiffon", "Velvet", "Organza"];
export const BRANDS = ["FabIndia", "H&M", "Zara", "Biba", "W", "Levi's", "Craftsvilla", "Anouk", "Roadster", "Global Desi", "Mango", "Allen Solly"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const CONDITIONS = ["Like New", "Excellent", "Good", "Fair"];
export const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat"];

export const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

export const IMAGE_POOL = {
  Dresses: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=600&q=80",
  ],
  "T-Shirts": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
  ],
  Jeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=600&q=80",
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
  ],
  Sarees: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
  ],
  Kurtis: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
  ],
  Skirts: [
    "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
  ],
  Shorts: [
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
  ],
  Hoodies: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
  ],
  "Co-ords": [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  ],
  "Ethnic Wear": [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  ],
  Activewear: [
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
  ],
  Blazers: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
  ],
};

function createRng(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateDemoSellers() {
  const rng = createRng(101);
  const sellers = [
    {
      id: "seller-proj-1",
      name: "Project Seller 1",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      location: "Mumbai, MH",
      rating: 4.9,
      salesCount: 42,
      rentalCount: 18,
      status: "Top Seller",
      bio: "Curated vintage & pre-loved designer wear. Fast delivery & verified authenticity.",
    },
    {
      id: "seller-proj-2",
      name: "Project Seller 2",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      location: "Bangalore, KA",
      rating: 4.8,
      salesCount: 35,
      rentalCount: 24,
      status: "Verified Pro",
      bio: "Sustainable luxury ethnic wear and high-fashion rental wardrobe.",
    },
    {
      id: "seller-proj-3",
      name: "Project Seller 3",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      location: "Delhi, DL",
      rating: 4.95,
      salesCount: 68,
      rentalCount: 41,
      status: "Eco Champion",
      bio: "Handloom silk sarees, upcycled denim, and circular streetwear.",
    },
    {
      id: "seller-proj-4",
      name: "Project Seller 4",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      location: "Hyderabad, TS",
      rating: 4.7,
      salesCount: 29,
      rentalCount: 15,
      status: "Rising Star",
      bio: "Premium casuals & festive wardrobe rentals at transparent rates.",
    },
  ];

  const firstNames = [
    "Aanya", "Rohan", "Priya", "Karthik", "Meera", "Arjun", "Divya", "Sanjay",
    "Nisha", "Vikram", "Pooja", "Rahul", "Sneha", "Aditya", "Kavya", "Manoj",
    "Ritu", "Suresh", "Ananya", "Deepak", "Lakshmi", "Varun", "Shreya", "Naveen",
    "Anjali", "Kiran",
  ];

  for (let i = 5; i <= 30; i++) {
    const name = `${firstNames[(i - 5) % firstNames.length]} S.`;
    const loc = LOCATIONS[Math.floor(rng() * LOCATIONS.length)];
    const rating = parseFloat((4.0 + rng() * 0.95).toFixed(1));
    const sales = 10 + Math.floor(rng() * 60);
    const rentals = 5 + Math.floor(rng() * 30);
    sellers.push({
      id: `seller-demo-${i}`,
      name,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      location: `${loc}, IN`,
      rating,
      salesCount: sales,
      rentalCount: rentals,
      status: rating > 4.7 ? "Verified Seller" : "Active Seller",
      bio: "Passionate about sustainable fashion and giving quality clothes a second life.",
    });
  }

  return sellers;
}

export function generate1000Products(sellersList = []) {
  const rng = createRng(42);
  const sellers = sellersList.length ? sellersList : generateDemoSellers();
  const products = [];

  const totalCount = 1024;

  for (let i = 1; i <= totalCount; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const subcats = SUBCATEGORIES[category] || [category];
    const subcategory = subcats[Math.floor(rng() * subcats.length)];
    const color = COLORS[Math.floor(rng() * COLORS.length)];
    const material = MATERIALS[Math.floor(rng() * MATERIALS.length)];
    const brand = BRANDS[Math.floor(rng() * BRANDS.length)];
    const condition = CONDITIONS[Math.floor(rng() * CONDITIONS.length)];
    const seller = sellers[i % sellers.length];
    const size = SIZES[Math.floor(rng() * SIZES.length)];

    const pool = IMAGE_POOL[category] || IMAGE_POOL["Dresses"];
    const mainImg = pool[(i + Math.floor(rng() * pool.length)) % pool.length];
    const secondImg = pool[(i + 1) % pool.length];

    const modeRoll = rng();
    const isBuyAvailable = modeRoll > 0.25;
    const isRentAvailable = modeRoll < 0.75;
    const mode = isBuyAvailable && isRentAvailable ? "both" : isBuyAvailable ? "shop" : "rent";

    const baseVal = 800 + Math.floor(rng() * 7500);
    const price = Math.round(baseVal * (condition === "Like New" ? 0.7 : condition === "Excellent" ? 0.55 : condition === "Good" ? 0.4 : 0.3));
    const rentalPrice = Math.max(99, Math.round(price * 0.12));
    const deposit = Math.round(price * 0.25);

    const title = `${color} ${material} ${subcategory} by ${brand}`;

    const rating = parseFloat((3.9 + rng() * 1.05).toFixed(1));
    const reviewsCount = 3 + Math.floor(rng() * 45);
    const qualityScore = 75 + Math.floor(rng() * 24);
    const sustainabilityScore = 80 + Math.floor(rng() * 19);

    const waterSaved = 1500 + Math.floor(rng() * 2800);
    const co2Saved = parseFloat((4.2 + rng() * 12.0).toFixed(1));

    products.push({
      id: `prod-${i}`,
      title,
      category,
      subcategory,
      color,
      material,
      brand,
      size,
      sizesAvailable: [size, SIZES[(SIZES.indexOf(size) + 1) % SIZES.length]],
      condition,
      price,
      originalPrice: baseVal,
      rentalPrice,
      deposit,
      mode,
      type: mode === 'rent' ? 'rent' : 'shop',
      image: mainImg,
      images: [mainImg, secondImg],
      sellerId: seller.id,
      sellerName: seller.name,
      sellerAvatar: seller.avatar,
      sellerRating: seller.rating,
      location: seller.location,
      rating,
      reviewsCount,
      qualityScore,
      sustainabilityScore,
      waterSaved,
      co2Saved,
      tags: [category.toLowerCase(), color.toLowerCase(), material.toLowerCase(), brand.toLowerCase(), condition.toLowerCase(), mode],
      createdAt: Date.now() - Math.floor(rng() * 86400000 * 90),
      rentBookings: [],
    });
  }

  return products;
}
