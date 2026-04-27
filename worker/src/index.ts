import { calculateUpsideScore } from "./scoring";
import { execute, queryAll, queryFirst } from "./db";

export interface Env {
  DB: D1Database;
  SNAPSHOTS?: R2Bucket;
}

type PredictionRow = {
  id: number;
  card_id: number;
  horizon: "30d" | "90d" | "180d";
  upside_score: number;
  confidence_bucket: "low" | "medium" | "high";
  momentum_score: number;
  catalyst_score: number;
  grading_score: number;
  volume_score: number;
  sentiment_score: number;
  created_at: string;
};

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/cards") {
      const cards = await queryAll(env.DB, "SELECT * FROM cards ORDER BY name");
      return json(cards);
    }

    if (request.method === "GET" && url.pathname === "/api/predictions") {
      const rows = await queryAll<PredictionRow>(
        env.DB,
        "SELECT * FROM predictions ORDER BY created_at DESC"
      );
      return json(rows);
    }

    if (request.method === "GET" && url.pathname === "/api/predictions/top") {
      const horizon = (url.searchParams.get("horizon") ?? "90d") as PredictionRow["horizon"];
      const limit = Number(url.searchParams.get("limit") ?? 20);
      const rows = await queryAll(
        env.DB,
        `SELECT p.*, c.name, c.set_name, c.rarity, c.current_price
         FROM predictions p
         JOIN cards c ON c.id = p.card_id
         WHERE p.horizon = ?
         ORDER BY p.upside_score DESC
         LIMIT ?`,
        [horizon, limit]
      );
      return json(rows);
    }

    if (request.method === "GET" && /^\/api\/cards\/\d+$/.test(url.pathname)) {
      const id = Number(url.pathname.split("/").pop());
      const card = await queryFirst(env.DB, "SELECT * FROM cards WHERE id = ?", [id]);
      if (!card) return json({ error: "Card not found" }, 404);

      const history = await queryAll(
        env.DB,
        "SELECT * FROM price_history WHERE card_id = ? ORDER BY observed_at DESC LIMIT 30",
        [id]
      );
      const prediction = await queryFirst(
        env.DB,
        "SELECT * FROM predictions WHERE card_id = ? ORDER BY created_at DESC LIMIT 1",
        [id]
      );
      return json({ card, history, prediction });
    }

    if (request.method === "POST" && url.pathname === "/api/ingest/mock-prices") {
      const cards = await queryAll<{ id: number; current_price: number }>(env.DB, "SELECT id, current_price FROM cards");
      const now = new Date().toISOString();
      for (const card of cards) {
        const pct = (Math.random() * 6 - 3) / 100;
        const price = Number((card.current_price * (1 + pct)).toFixed(2));
        await execute(
          env.DB,
          "INSERT INTO price_history (card_id, source, price, observed_at) VALUES (?, 'mock', ?, ?)",
          [card.id, price, now]
        );
        await execute(env.DB, "UPDATE cards SET current_price = ?, updated_at = ? WHERE id = ?", [price, now, card.id]);
      }
      return json({ status: "ok", inserted: cards.length });
    }

    if (request.method === "POST" && url.pathname === "/api/score/run") {
      const cards = await queryAll<{ id: number; trend_7d: number; trend_30d: number }>(
        env.DB,
        "SELECT id, trend_7d, trend_30d FROM cards"
      );
      const createdAt = new Date().toISOString();

      for (const card of cards) {
        const breakdown = calculateUpsideScore({
          momentum: clamp(50 + card.trend_30d * 2.5),
          catalyst: clamp(55 + Math.random() * 35),
          grading: clamp(45 + Math.random() * 45),
          volume: clamp(50 + Math.random() * 30),
          sentiment: clamp(50 + card.trend_7d * 3)
        });

        for (const horizon of ["30d", "90d", "180d"] as const) {
          await execute(
            env.DB,
            `INSERT INTO predictions (
              card_id, horizon, upside_score, confidence_bucket,
              momentum_score, catalyst_score, grading_score, volume_score, sentiment_score, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              card.id,
              horizon,
              breakdown.upsideScore,
              breakdown.confidenceBucket,
              breakdown.momentum,
              breakdown.catalyst,
              breakdown.grading,
              breakdown.volume,
              breakdown.sentiment,
              createdAt
            ]
          );
        }
      }

      return json({ status: "ok", scored_cards: cards.length });
    }

    return json({ error: "Not found" }, 404);
  },

  async scheduled(_event, env): Promise<void> {
    await execute(env.DB, "INSERT INTO alerts (type, message, created_at) VALUES ('cron', 'daily scoring placeholder ran', ?)", [
      new Date().toISOString()
    ]);
  }
} satisfies ExportedHandler<Env>;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Number(value.toFixed(2))));
}
