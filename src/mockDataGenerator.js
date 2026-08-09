// src/mockDataGenerator.js
// Strictly Clothing Only Marketplace Generator with Unique Non-Repeating Images & 50+ items per category

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
];

export const SUBCATEGORIES = {
  Dresses: ["Summer Maxi Dress", "Bodycon Evening Gown", "Wrap Floral Dress", "Cocktail Satin Dress", "A-Line Cotton Dress"],
  Frocks: ["Floral Vintage Frock", "Tiered Summer Frock", "A-Line Casual Frock", "Embroidered Flare Frock", "Pastel Party Frock"],
  Kurtis: ["Printed Rayon Kurti", "Chikankari Cotton Kurti", "Short Denim Kurti", "A-Line Designer Kurti", "Silk Straight Kurti"],
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
};

export const COLORS = ["Black", "Blue", "Red", "Pink", "White", "Green", "Yellow", "Navy", "Pastel", "Maroon", "Beige", "Gold", "Purple", "Olive"];
export const MATERIALS = ["Cotton", "Denim", "Silk", "Linen", "Rayon", "Wool", "Polyester", "Chiffon", "Velvet", "Organza"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const CONDITIONS = ["Like New", "Excellent", "Good", "Fair"];
export const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat"];

export const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

// Base Category Image Pool
export const CATEGORY_IMAGE_MAP = {
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
};

const SAMPLE_REVIEWS = [
  { author: "Ananya P. (Verified Buyer)", rating: 5, date: "3 days ago", comment: "Fabric condition is absolutely spotless! Delivered in eco packaging within 2 days." },
  { author: "Rohan M. (Verified Buyer)", rating: 4.9, date: "1 week ago", comment: "Fits perfectly. Quality is just as described by the seller." },
  { author: "Meera S. (Verified Buyer)", rating: 5, date: "2 weeks ago", comment: "Loved this purchase! High quality material and smooth delivery process." },
  { author: "Divya K. (Verified Renter)", rating: 4.8, date: "1 month ago", comment: "Rented this for a weekend wedding. Received endless compliments!" },
];

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
  ];

  const firstNames = ["Aanya", "Rohan", "Priya", "Karthik", "Meera", "Arjun", "Divya", "Sanjay", "Nisha", "Vikram", "Pooja", "Rahul", "Sneha"];
  for (let i = 3; i <= 20; i++) {
    const name = `${firstNames[(i - 3) % firstNames.length]} S.`;
    const loc = LOCATIONS[Math.floor(rng() * LOCATIONS.length)];
    sellers.push({
      id: `seller-demo-${i}`,
      name,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      location: `${loc}, IN`,
      rating: parseFloat((4.2 + rng() * 0.75).toFixed(1)),
      salesCount: 20 + Math.floor(rng() * 100),
      rentalCount: 10 + Math.floor(rng() * 50),
      status: "Verified Seller",
      bio: "Passionate about giving quality clothes a second life.",
    });
  }

  return sellers;
}

export function generate1000Products(sellersList = []) {
  const rng = createRng(42);
  const sellers = sellersList.length ? sellersList : generateDemoSellers();
  const products = [];

  let globalId = 1;

  // Guarantee minimum 500 products for EVERY SINGLE CATEGORY (500 * 19 = 9,500 products)
  CATEGORIES.forEach((cat) => {
    const subcats = SUBCATEGORIES[cat] || [cat];
    const pool = CATEGORY_IMAGE_MAP[cat] || CATEGORY_IMAGE_MAP["Dresses"];

    for (let c = 1; c <= 520; c++) {
      const subcategory = subcats[c % subcats.length];
      const color = COLORS[(globalId + c) % COLORS.length];
      const material = MATERIALS[(globalId + c) % MATERIALS.length];
      const condition = CONDITIONS[(globalId + c) % CONDITIONS.length];
      const seller = sellers[(globalId + c) % sellers.length];
      const size = SIZES[(globalId + c) % SIZES.length];

      // Unique Image Signature per item so NO image repeats across screens!
      const baseImg = pool[c % pool.length];
      const mainImg = `${baseImg}&sig=wv_${globalId}_${cat.toLowerCase().replace(/[^a-z]/g, "")}`;

      const modeRoll = rng();
      const isBuyAvailable = modeRoll > 0.25;
      const isRentAvailable = modeRoll < 0.75;
      const mode = isBuyAvailable && isRentAvailable ? "both" : isBuyAvailable ? "shop" : "rent";

      const baseVal = 800 + Math.floor(rng() * 7500);
      const price = Math.round(baseVal * (condition === "Like New" ? 0.75 : condition === "Excellent" ? 0.6 : condition === "Good" ? 0.45 : 0.3));
      const rentalPrice = Math.max(99, Math.round(price * 0.12));

      const title = `${color} ${material} ${subcategory}`;
      const rating = parseFloat((4.2 + rng() * 0.75).toFixed(1));

      products.push({
        id: `prod-${globalId}`,
        title,
        category: cat,
        subcategory,
        color,
        material,
        brand: "WearVerse Collection",
        size,
        sizesAvailable: [size],
        condition,
        price,
        originalPrice: baseVal,
        rentalPrice,
        mode,
        type: mode === "rent" ? "rent" : "shop",
        image: mainImg,
        sellerId: seller.id,
        sellerName: seller.name,
        location: seller.location,
        rating,
        reviewsCount: 12 + Math.floor(rng() * 40),
        reviews: SAMPLE_REVIEWS,
        createdAt: Date.now() - Math.floor(rng() * 86400000 * 90),
      });

      globalId++;
    }
  });

  return products;
}
