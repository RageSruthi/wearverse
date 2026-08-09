// src/aiClassifier.js
//
// In-browser AI helpers used by the Seller Upload flow:
//   1. isClothing(file)      -> reject non-clothing photos
//   2. classifyCondition(fl) -> "Good" | "Slightly Damaged" | "Severely Damaged"
//
// Uses @xenova/transformers (CLIP zero-shot classification), same
// model you were already loading in the vanilla scanner page.
//
// npm install @xenova/transformers

let pipelinePromise = null;
let classifier = null;

export function isReady() {
  return classifier !== null;
}

export async function loadAI(onStatus = () => {}) {
  if (classifier) return classifier;

  if (!pipelinePromise) {
    onStatus("Loading browser AI...");
    pipelinePromise = import("@xenova/transformers").then(({ pipeline }) =>
      pipeline("zero-shot-image-classification", "Xenova/clip-vit-base-patch32")
    );
  }

  classifier = await pipelinePromise;
  onStatus("AI ready.");
  return classifier;
}

const CLOTHING_LABELS = [
  "a photograph of a dress",
  "a photograph of clothing",
  "a photograph of a garment",
  "a photograph of a shirt",
  "a photograph of trousers",
  "a photograph of jeans",
  "a photograph of a skirt",
  "a photograph of a jacket",
  "a photograph of traditional clothing",
  "a photograph of a saree",
  "a photograph of a kurta",
  "a photograph of fashion clothing",
];

const NON_CLOTHING_LABELS = [
  "a photograph of furniture",
  "a photograph of a car",
  "a photograph of a phone",
  "a photograph of food",
  "a photograph of an animal",
  "a photograph of a building",
  "a photograph of a random object",
];

const CONDITION_LABELS = [
  "an intact clothing item with no damage",
  "a new clothing item in good condition",
  "an intentionally designed off shoulder or sleeveless dress",
  "a clothing item with a small accidental tear or hole",
  "a clothing item with a ripped seam",
  "a severely torn or badly damaged clothing item",
];

export async function isClothing(file) {
  const clf = await loadAI();
  const url = URL.createObjectURL(file);
  try {
    const predictions = await clf(url, [
      ...CLOTHING_LABELS,
      ...NON_CLOTHING_LABELS,
    ]);

    let clothingScore = 0;
    let objectScore = 0;
    predictions.forEach((p) => {
      if (CLOTHING_LABELS.includes(p.label)) {
        clothingScore = Math.max(clothingScore, p.score);
      }
      if (NON_CLOTHING_LABELS.includes(p.label)) {
        objectScore = Math.max(objectScore, p.score);
      }
    });

    return clothingScore >= 0.2 && clothingScore > objectScore;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function classifyCondition(file) {
  const clf = await loadAI();
  const url = URL.createObjectURL(file);

  try {
    const predictions = await clf(url, CONDITION_LABELS);

    let good = 0;
    let slight = 0;
    let severe = 0;

    predictions.forEach((p) => {
      const label = p.label.toLowerCase();
      if (
        label.includes("intact") ||
        label.includes("good condition") ||
        label.includes("off shoulder") ||
        label.includes("sleeveless")
      ) {
        good += p.score;
      } else if (
        label.includes("small accidental tear") ||
        label.includes("ripped seam")
      ) {
        slight += p.score;
      } else if (label.includes("severely torn") || label.includes("badly damaged")) {
        severe += p.score;
      }
    });

    const total = good + slight + severe;

    // Low signal overall -> don't guess damage, default to Good.
    if (total < 0.45) {
      return { condition: "Good", confidence: 55 };
    }

    if (good >= slight && good >= severe) {
      return { condition: "Good", confidence: Math.min(good * 100, 95) };
    }
    if (severe > slight && severe > good) {
      return { condition: "Severely Damaged", confidence: Math.min(severe * 100, 95) };
    }
    return { condition: "Slightly Damaged", confidence: Math.min(slight * 100, 90) };
  } finally {
    URL.revokeObjectURL(url);
  }
}
