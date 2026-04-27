import { useMemo, useState } from "react";
import { CardDetail } from "./components/CardDetail";
import { CardTable } from "./components/CardTable";
import { FilterBar } from "./components/FilterBar";
import { cards, predictions } from "./lib/mockData";
import type { Horizon } from "./types";

export default function App() {
  const [horizon, setHorizon] = useState<Horizon | "all">("all");
  const [selectedId, setSelectedId] = useState<number>(cards[0].id);

  const rows = useMemo(() => {
    return predictions
      .filter((p) => (horizon === "all" ? true : p.horizon === horizon))
      .sort((a, b) => b.upside_score - a.upside_score)
      .map((prediction) => ({
        prediction,
        card: cards.find((c) => c.id === prediction.card_id)!
      }));
  }, [horizon]);

  const selected = rows.find((r) => r.card.id === selectedId) ?? rows[0];

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-4 p-4 text-slate-200 md:p-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Pokémon Value Predictor</h1>
          <p className="text-sm text-slate-400">Rule-based upside scoring for 30-day, 90-day, and 6-month horizons.</p>
        </div>
        <div className="rounded bg-terminal-800 px-3 py-2 text-xs text-slate-300">Data source: mock seed · MVP mode</div>
      </header>

      <FilterBar horizon={horizon} setHorizon={setHorizon} />
      <CardTable rows={rows} onSelect={setSelectedId} />
      <CardDetail card={selected?.card} prediction={selected?.prediction} />
    </main>
  );
}
