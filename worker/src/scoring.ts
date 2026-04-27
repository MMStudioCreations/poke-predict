export type ScoreInput = {
  momentum: number;
  catalyst: number;
  grading: number;
  volume: number;
  sentiment: number;
};

export type ScoreBreakdown = {
  upsideScore: number;
  confidenceBucket: "low" | "medium" | "high";
} & ScoreInput;

const WEIGHTS = {
  momentum: 0.25,
  catalyst: 0.3,
  grading: 0.2,
  volume: 0.15,
  sentiment: 0.1
} as const;

export function calculateUpsideScore(input: ScoreInput): ScoreBreakdown {
  const upsideScore =
    input.momentum * WEIGHTS.momentum +
    input.catalyst * WEIGHTS.catalyst +
    input.grading * WEIGHTS.grading +
    input.volume * WEIGHTS.volume +
    input.sentiment * WEIGHTS.sentiment;

  let confidenceBucket: "low" | "medium" | "high" = "low";
  if (upsideScore >= 75) confidenceBucket = "high";
  else if (upsideScore >= 55) confidenceBucket = "medium";

  return {
    upsideScore: Number(upsideScore.toFixed(2)),
    confidenceBucket,
    ...input
  };
}
