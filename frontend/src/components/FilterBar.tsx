import type { Horizon } from "../types";

interface Props {
  horizon: Horizon | "all";
  setHorizon: (h: Horizon | "all") => void;
}

export function FilterBar({ horizon, setHorizon }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl bg-terminal-800 p-4 md:grid-cols-5">
      <select className="rounded bg-terminal-700 p-2 text-sm">
        <option>All Prices</option>
        <option>Under $50</option>
        <option>$50-$150</option>
        <option>$150+</option>
      </select>
      <select className="rounded bg-terminal-700 p-2 text-sm">
        <option>All Sets</option>
        <option>Surging Sparks</option>
        <option>Lost Origin</option>
      </select>
      <select className="rounded bg-terminal-700 p-2 text-sm">
        <option>All Rarity</option>
        <option>SIR</option>
        <option>Alt Art</option>
      </select>
      <select className="rounded bg-terminal-700 p-2 text-sm">
        <option>All Confidence</option>
        <option>High</option>
        <option>Medium</option>
      </select>
      <select
        className="rounded bg-terminal-700 p-2 text-sm"
        value={horizon}
        onChange={(e) => setHorizon(e.target.value as Horizon | "all")}
      >
        <option value="all">All Horizons</option>
        <option value="30d">30-day</option>
        <option value="90d">90-day</option>
        <option value="180d">6-month</option>
      </select>
    </div>
  );
}
