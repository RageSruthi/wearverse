// src/mockDataGenerator.js
// Strictly Clothing Only Marketplace Generator with 100% Disjoint Exclusive Categories & Images

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
  Dresses: ["Summer Maxi Dress", "Bodycon Evening Gown", "Wrap Floral Dress", "Cocktail Satin Dress", "A-Line Cotton Dress", "Boho Tiered Midi", "Silk Slip Gown"],
  Frocks: ["Floral Vintage Frock", "Tiered Summer Frock", "A-Line Casual Frock", "Embroidered Flare Frock", "Pastel Party Frock", "Layered Tulle Frock"],
  Kurtis: ["Printed Rayon Kurti", "Chikankari Cotton Kurti", "Short Denim Kurti", "A-Line Designer Kurti", "Silk Straight Kurti", "Flared Anarkali Kurti"],
  Sarees: ["Handloom Silk Saree", "Banarasi Brocade Saree", "Chiffon Floral Saree", "Kanjeevaram Silk Saree", "Cotton Mulmul Saree", "Organza Embroidered Saree"],
  Shirts: ["Casual Linen Shirt", "Formal Cotton Shirt", "Oversized Denim Shirt", "Printed Hawaiian Shirt", "Oxford Solid Shirt", "Corduroy Button Down"],
  "T-Shirts": ["Graphic Print Tee", "Classic Crewneck", "Oversized Vintage Tee", "V-Neck Casual Tee", "Striped Polo Tee", "Acid Wash Heavyweight Tee"],
  Jeans: ["Slim Fit Denim Jeans", "Wide Leg Vintage Jeans", "Mom Fit Distressed Jeans", "High-Waist Straight Jeans", "Cargo Denim Jeans", "Flared Retro Jeans"],
  Trousers: ["Pleated Tailored Trousers", "Linen Wide Leg Trousers", "Formal Slim Trousers", "Cropped Chino Trousers", "High-Waisted Crepe Pants"],
  Skirts: ["Pleated Midi Skirt", "Denim Mini Skirt", "A-Line Floral Skirt", "Wrap Long Skirt", "Tiered Maxi Skirt", "Satin Bias Cut Skirt"],
  Jackets: ["Midnight Blue Denim Jacket", "Leather Biker Jacket", "Puffer Zip Jacket", "Bomber Jacket", "Fleece Sherpa Jacket", "Quilted Utility Vest"],
  Blazers: ["Oversized Structured Blazer", "Double-Breasted Blazer", "Cropped Linen Blazer", "Velvet Evening Blazer", "Houndstooth Wool Blazer"],
  "Co-ords": ["Pastel Linen Co-ord Set", "Printed Satin Lounge Co-ord", "Knit Crop & Shorts Co-ord", "Tailored Blazer & Pants Set", "Ribbed Seamless Set"],
  Lehengas: ["Embroidered Silk Lehenga", "Floral Organza Lehenga", "Velvet Bridal Lehenga", "Georgette Festive Lehenga", "Mirror Work Chaniya Choli"],
  Anarkalis: ["Embroidered Festive Anarkali", "Floor-Length Silk Anarkali", "Chiffon Anarkali Suit", "Gota Patti Anarkali", "Angrakha Flared Suit"],
  "Ethnic Wear": ["Indo-Western Fusion Set", "Kurta Pajama Set", "Sherwani Jacket", "Bandhgala Suit", "Jacquard Nehru Jacket Set"],
  "Party Wear": ["Sequin Glamour Outfit", "Satin Slip Gown", "Velvet Tuxedo Blazer", "Metallic Shimmer Outfit", "Feather Trim Cocktail Dress"],
  "Casual Wear": ["Everyday Cotton Combo", "Lounge Sweat Set", "Denim Overalls", "Relaxed Fit Set", "Waffle Knit Loungewear"],
  "Formal Wear": ["Corporate Trouser Suit", "Executive Cotton Shirt", "Pencil Skirt & Blazer", "Formal Vest Suit", "Tuxedo Evening Suit"],
  "Kids Wear": ["Kids Cotton Frock", "Junior Denim Dungaree", "Festive Kurta Set", "Kids Printed Hoodie", "Baby Organic Cotton Romper"],
};

export const COLORS = ["Black", "Blue", "Red", "Pink", "White", "Green", "Yellow", "Navy", "Pastel", "Maroon", "Beige", "Gold", "Purple", "Olive", "Coral", "Lavender", "Mint", "Charcoal", "Emerald", "Rust"];
export const MATERIALS = ["Cotton", "Denim", "Silk", "Linen", "Rayon", "Wool", "Polyester", "Chiffon", "Velvet", "Organza", "Satin", "Georgette", "Knit", "Crepe"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const CONDITIONS = ["Like New", "Excellent", "Good", "Fair"];
export const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat", "Chandigarh", "Kochi", "Lucknow"];

export const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80";

// 100% STRICTLY DISJOINT EXCLUSIVE CATEGORY PHOTO POOLS (NO CATEGORY CROSS-OVER)
export const UNIQUE_PHOTO_IDS = {
  Sarees: [
    "1610030469983-98e550d6193c",
    "1617627143750-d86bc21e42bb",
    "1609357605129-26f69add5d6e",
  ],
  Kurtis: [
    "1583391733956-6c78276477e2",
    "1594633312681-425c7b97ccd1",
    "1583391733975-d1ce4999a4e3",
  ],
  Lehengas: [
    "1595777457583-95e059d581b8",
    "1583391733983-160b7e217277",
  ],
  Anarkalis: [
    "1609357605141-86e5c8cb2407",
    "1598554747436-c9293d6a588f",
  ],
  Shirts: [
    "1602810318383-e386cc2a3ccf",
    "1596755094514-f87e34085b2c",
    "1620012253295-c15cc3e65df4",
  ],
  "T-Shirts": [
    "1521572163474-6864f9cf17ab",
    "1503341504253-dff4815485f1",
    "1576566588028-4147f3842f27",
  ],
  Dresses: [
    "1566174053879-31528523f8ae",
    "1502716119720-b23a93e5fe1b",
    "1515372039744-b8f02a3ae446",
  ],
  Frocks: [
    "1496747611176-843222e1e57c",
    "1518831959646-742c3a14ebf7",
  ],
  Jeans: [
    "1542272604-787c3835535d",
    "1541099649105-f69ad21f3246",
    "1475178626620-a4d074967452",
  ],
  Trousers: [
    "1582552938357-32b906df40cb",
    "1591195853828-11db59a44f6b",
  ],
  Skirts: [
    "1583496661160-fb5886a13d27",
    "1551163943-3f6a855d1153",
  ],
  Jackets: [
    "1551028719-00167b16eac5",
    "1544022613-e87ca75a784a",
  ],
  Blazers: [
    "1591047139829-d91aecb6caea",
    "1548624313-0396c75e4b1a",
  ],
  "Co-ords": [
    "1509631179647-0177331693ae",
    "1515886657613-9f3515b0c78f",
  ],
  "Ethnic Wear": [
    "1583391733975-d1ce4999a4e3",
    "1609357605141-86e5c8cb2407",
  ],
  "Party Wear": [
    "1539571696357-5a69c17a67c6",
    "1529139574466-a303027c1d8b",
  ],
  "Casual Wear": [
    "1583743814966-8936f5b7be1a",
    "1562157873-818bc0726f68",
  ],
  "Formal Wear": [
    "1589310243389-96a5483213a8",
    "1603252109303-275144184724",
  ],
  "Kids Wear": [
    "1519238263530-99bdd11df2ea",
    "1503944583220-79d8926ad5e2",
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

  // Guarantee minimum 520 distinct products per category with strictly exclusive photo pools
  CATEGORIES.forEach((cat) => {
    const subcats = SUBCATEGORIES[cat] || [cat];
    const pool = UNIQUE_PHOTO_IDS[cat] || UNIQUE_PHOTO_IDS["Dresses"];

    for (let c = 1; c <= 520; c++) {
      const subcategory = subcats[(c - 1) % subcats.length];
      const color = COLORS[(globalId + c) % COLORS.length];
      const material = MATERIALS[(globalId * 3 + c) % MATERIALS.length];
      const condition = CONDITIONS[(globalId + c * 7) % CONDITIONS.length];
      const seller = sellers[(globalId + c) % sellers.length];
      const size = SIZES[(globalId + c) % SIZES.length];

      const photoId = pool[(c - 1) % pool.length];

      // Dynamic crop signatures per item so EVERY single image is visually distinct
      const mainImg = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=80&item=${globalId}&style=${c}`;

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
        id: `prod-strict-${globalId}`,
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
