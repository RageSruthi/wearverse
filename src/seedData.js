// src/seedData.js
//
// Generates demo sellers + listings using REAL Unsplash photos
// (no AI-generated images). Used only to seed localStorage the
// first time the app runs, so Shop/Rent have content before any
// real seller has uploaded anything.

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
];

// A handful of real, stable Unsplash photos per category.
// (Same pattern you were already using on the Home page.)
const IMAGE_POOL = {
  Dresses: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4",
  ],
  "T-Shirts": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  ],
  Jeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    "https://images.unsplash.com/photo-1475178626620-a4d074967452",
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  ],
  Sarees: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
  ],
  Kurtis: [
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
  ],
  Skirts: [
    "https://images.unsplash.com/photo-1583496661160-fb5886a13d27",
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153",
  ],
  Shorts: [
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    "https://images.unsplash.com/photo-1591195853866-be0388b1de08",
  ],
  Hoodies: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7",
  ],
};

const FIRST_NAMES = [
  "Aanya", "Rohan", "Priya", "Karthik", "Meera", "Arjun", "Divya", "Sanjay",
  "Nisha", "Vikram", "Pooja", "Rahul", "Sneha", "Aditya", "Kavya", "Manoj",
  "Ritu", "Suresh", "Ananya", "Deepak", "Lakshmi", "Varun", "Shreya", "Naveen",
  "Anjali", "Kiran", "Neha", "Rajesh", "Swathi", "Harish",
];

function img(url, w = 500) {
  return `${url}?auto=format&fit=crop&w=${w}&q=80`;
}

// tiny seeded RNG so the "random" catalog is stable across reloads
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Builds N demo sellers, each with 1-3 listings spread across
 * Shop / Rent / Recycle so every section has content on first load.
 */
export function generateSeedListings(sellerCount = 30) {
  const rng = makeRng(42);
  const listings = [];

  for (let i = 0; i < sellerCount; i++) {
    const sellerId = `seed-seller-${i + 1}`;
    const sellerName = FIRST_NAMES[i % FIRST_NAMES.length];
    const itemsForSeller = 1 + Math.floor(rng() * 3); // 1-3 items

    for (let j = 0; j < itemsForSeller; j++) {
      const category = CATEGORIES[Math.floor(rng() * CATEGORIES.length)];
      const pool = IMAGE_POOL[category];
      const image = img(pool[Math.floor(rng() * pool.length)]);

      // Decide condition, then decide destination the same way the
      // real AI-upload flow does: severe -> recycle, otherwise the
      // seller/AI jointly picks shop or rent.
      const conditionRoll = rng();
      const condition =
        conditionRoll < 0.6 ? "Good" : conditionRoll < 0.88 ? "Slightly Damaged" : "Severely Damaged";

      let type;
      if (condition === "Severely Damaged") {
        type = "recycle";
      } else {
        type = rng() < 0.65 ? "shop" : "rent";
      }

      const basePrice = 300 + Math.floor(rng() * 1200);

      listings.push({
        id: `${sellerId}-item-${j + 1}`,
        title: `${category.replace(/s$/, "")} — ${sellerName}'s pick`,
        category,
        image,
        images: [image],
        condition,
        type, // 'shop' | 'rent' | 'recycle'
        price: type === "rent" ? Math.round(basePrice / 10) : basePrice, // per-day for rent
        sellerId,
        sellerName,
        createdAt: Date.now() - Math.floor(rng() * 1e10),
        rentBookings: [],
        seeded: true,
      });
    }
  }

  return listings;
}
