import type { Card, Prediction } from "../types";

export const cards: Card[] = [
  {
    id: 1,
    name: "Pikachu ex (Special Illustration Rare)",
    set_name: "Surging Sparks",
    rarity: "SIR",
    current_price: 122.4,
    trend_7d: 4.2,
    trend_30d: 11.3,
    catalyst_notes: "Strong social buzz + upcoming regional events.",
    grading_potential: "High centering quality in recent pulls."
  },
  {
    id: 2,
    name: "Charizard ex",
    set_name: "Obsidian Flames",
    rarity: "Ultra Rare",
    current_price: 61.85,
    trend_7d: -1.8,
    trend_30d: 6.1,
    catalyst_notes: "Supply cooling after reprint window.",
    grading_potential: "Moderate; edge wear risk."
  },
  {
    id: 3,
    name: "Giratina V (Alt Art)",
    set_name: "Lost Origin",
    rarity: "Alt Art",
    current_price: 298.7,
    trend_7d: 3.1,
    trend_30d: 9.2,
    catalyst_notes: "Legacy chase card with sustained liquidity.",
    grading_potential: "Premium 10 upside on clean copies."
  }
];

export const predictions: Prediction[] = [
  {
    id: 1,
    card_id: 1,
    horizon: "90d",
    upside_score: 82.4,
    confidence_bucket: "high",
    momentum_score: 78,
    catalyst_score: 88,
    grading_score: 81,
    volume_score: 76,
    sentiment_score: 83
  },
  {
    id: 2,
    card_id: 2,
    horizon: "30d",
    upside_score: 64.8,
    confidence_bucket: "medium",
    momentum_score: 59,
    catalyst_score: 66,
    grading_score: 62,
    volume_score: 71,
    sentiment_score: 65
  },
  {
    id: 3,
    card_id: 3,
    horizon: "180d",
    upside_score: 79.2,
    confidence_bucket: "high",
    momentum_score: 72,
    catalyst_score: 75,
    grading_score: 90,
    volume_score: 77,
    sentiment_score: 70
  }
];
