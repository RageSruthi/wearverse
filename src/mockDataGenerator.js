// src/mockDataGenerator.js
// Deterministically generates 30 Demo Sellers and 10,000 Realistic Demo Products.

export const CATEGORIES = [
  "Dresses",
  "Frocks",
  "Kurtis",
  "Sarees",
  "Shirts",
  "T-Shirts",
  "Jeans",
  "Trousers",
  "Skirts",
  "Jackets",
  "Blazers",
  "Co-ords",
  "Lehengas",
  "Anarkalis",
  "Ethnic Wear",
  "Party Wear",
  "Casual Wear",
  "Formal Wear",
  "Kids Wear",
  "Accessories",
];

export const SUBCATEGORIES = {
  Dresses: ["Summer Maxi Dress", "Bodycon Dress", "Wrap Floral Dress", "Cocktail Evening Gown", "A-Line Midi Dress"],
  Frocks: ["Floral Cotton Summer Frock", "Tiered Vintage Frock", "A-Line Casual Frock", "Embroidered Frock", "Pastel Flare Frock"],
  Kurtis: ["Printed Rayon Kurti", "Chikankari Cotton Kurti", "Denim Short Kurti", "A-Line Designer Kurti", "Straight Silk Kurti"],
  Sarees: ["Handloom Silk Saree", "Banarasi Brocade Saree", "Chiffon Floral Saree", "Kanjeevaram Silk Saree", "Cotton Mulmul Saree"],
  Shirts: ["Casual Linen Shirt", "Formal Cotton Shirt", "Oversized Denim Shirt", "Printed Hawaiian Shirt", "Oxford Solid Shirt"],
  "T-Shirts": ["Graphic Print Tee", "Classic Crewneck", "Oversized Vintage Tee", "V-Neck Casual Tee", "Striped Polo Tee"],
  Jeans: ["Slim Fit Denim Jeans", "Wide Leg Vintage Jeans", "Mom Fit Distressed Jeans", "High-Waist Straight Jeans", "Cargo Denim Jeans"],
  Trousers: ["Pleated Tailored Trousers", "Linen Wide Leg Trousers", "Formal Slim Trousers", "Cropped Chino Trousers"],
  Skirts: ["Pleated Midi Skirt", "Denim Mini Skirt", "A-Line Floral Skirt", "Wrap Long Skirt", "Tiered Maxi Skirt"],
  Jackets: ["Midnight Blue Denim Jacket", "Leather Biker Jacket", "Puffer Zip Jacket", "Bomber Jacket", "Fleece Sherpa Jacket"],
  Blazers: ["Oversized Structured Blazer", "Double-Breasted Blazer", "Cropped Linen Blazer", "Velvet Evening Blazer"],
  "Co-ords": ["Pastel Linen Co-ord Set", "Printed Satin Lounge Co-ord", "Knit Crop & Shorts Co-ord", "Tailored Blazer & Pants Set"],
  Lehengas: ["Embroidered Silk Lehenga", "Floral Organza Lehenga", "Velvet Bridal Lehenga", "Georgette Festive Lehenga"],
  Anarkalis: ["Embroidered Festive Anarkali", "Floor-Length Silk Anarkali", "Chiffon Anarkali Suit", "Gota Patti Anarkali"],
  "Ethnic Wear": ["Indo-Western Fusion Set", "Kurta Pajama Set", "Sherwani Jacket", "Bandhgala Suit"],
  "Party Wear": ["Sequin Glamour Outfit", "Satin Slip Gown", "Velvet Tuxedo Blazer", "Metallic Shimmer Outfit"],
  "Casual Wear": ["Everyday Cotton Combo", "Lounge Sweat Set", "Denim Overalls", "Relaxed Fit Set"],
  "Formal Wear": ["Corporate Trouser Suit", "Executive Cotton Shirt", "Pencil Skirt & Blazer", "Formal Vest Suit"],
  "Kids Wear": ["Kids Cotton Frock", "Junior Denim Dungaree", "Festive Kurta Set", "Kids Printed Hoodie"],
  Accessories: ["Handcrafted Tote Bag", "Embroidered Belt", "Upcycled Denim Sling", "Vintage Silk Scarf"],
};

export const COLORS = ["Black", "Blue", "Red", "Pink", "White", "Green", "Yellow", "Navy", "Pastel", "Maroon", "Beige", "Gold", "Purple", "Olive"];
export const MATERIALS = ["Cotton", "Denim", "Silk", "Linen", "Rayon", "Wool", "Polyester", "Chiffon", "Velvet", "Organza"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const CONDITIONS = ["Like New", "Excellent", "Good", "Fair"];
export const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat"];

export const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

export const IMAGE_POOL = {
  Dresses: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
  ],
  Frocks: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
  ],
  Kurtis: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80",
  ],
  Sarees: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1610030470298-0be6f1936c53?auto=format&fit=crop&w=600&q=80",
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
  Trousers: [
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
  ],
  Skirts: [
    "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
  ],
  Blazers: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=600&q=80",
  ],
  "Co-ords": [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  ],
  Lehengas: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
  ],
  Anarkalis: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
  ],
  "Ethnic Wear": [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  ],
  "Party Wear": [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
  ],
  "Casual Wear": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
  ],
  "Formal Wear": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  ],
  "Kids Wear": [
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
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
      salesCount: 142,
      rentalCount: 58,
      status: "Top Seller",
      bio: "Curated vintage & pre-loved designer wear. Fast delivery & verified authenticity.",
    },
    {
      id: "seller-proj-2",
      name: "Project Seller 2",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      location: "Bangalore, KA",
      rating: 4.8,
      salesCount: 135,
      rentalCount: 84,
      status: "Verified Pro",
      bio: "Sustainable luxury ethnic wear and high-fashion rental wardrobe.",
    },
    {
      id: "seller-proj-3",
      name: "Project Seller 3",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      location: "Delhi, DL",
      rating: 4.95,
      salesCount: 168,
      rentalCount: 91,
      status: "Eco Champion",
      bio: "Handloom silk sarees, upcycled denim, and circular streetwear.",
    },
    {
      id: "seller-proj-4",
      name: "Project Seller 4",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      location: "Hyderabad, TS",
      rating: 4.7,
      salesCount: 129,
      rentalCount: 65,
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
    const sales = 20 + Math.floor(rng() * 120);
    const rentals = 10 + Math.floor(rng() * 60);
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

  const totalCount = 10000; // 10,000 items

  for (let i = 1; i <= totalCount; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const subcats = SUBCATEGORIES[category] || [category];
    const subcategory = subcats[Math.floor(rng() * subcats.length)];
    const color = COLORS[i % COLORS.length]; // Ensures uniform distribution of every color!
    const material = MATERIALS[Math.floor(rng() * MATERIALS.length)];
    const condition = CONDITIONS[i % CONDITIONS.length]; // Equal distribution across Like New, Excellent, Good, Fair!
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
    const price = Math.round(baseVal * (condition === "Like New" ? 0.75 : condition === "Excellent" ? 0.6 : condition === "Good" ? 0.45 : 0.3));
    const rentalPrice = Math.max(99, Math.round(price * 0.12));
    const deposit = Math.round(price * 0.25);

    const title = `${color} ${material} ${subcategory}`;

    const rating = parseFloat((4.0 + rng() * 0.95).toFixed(1));
    const reviewsCount = 3 + Math.floor(rng() * 65);
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
      brand: "WearVerse Collection",
      size,
      sizesAvailable: [size, SIZES[(SIZES.indexOf(size) + 1) % SIZES.length]],
      condition,
      price,
      originalPrice: baseVal,
      rentalPrice,
      deposit,
      mode,
      type: mode === "rent" ? "rent" : "shop",
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
      tags: [category.toLowerCase(), color.toLowerCase(), material.toLowerCase(), condition.toLowerCase(), mode],
      createdAt: Date.now() - Math.floor(rng() * 86400000 * 90),
      rentBookings: [],
    });
  }

  return products;
}
