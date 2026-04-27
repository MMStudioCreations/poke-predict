export type Horizon = "30d" | "90d" | "180d";

export interface Card {
  id: number;
  name: string;
  set_name: string;
  rarity: string;
  current_price: number;
  trend_7d: number;
  trend_30d: number;
  catalyst_notes: string;
  grading_potential: string;
}

export interface Prediction {
  id: number;
  card_id: number;
  horizon: Horizon;
  upside_score: number;
  confidence_bucket: "low" | "medium" | "high";
  momentum_score: number;
  catalyst_score: number;
  grading_score: number;
  volume_score: number;
  sentiment_score: number;
}
