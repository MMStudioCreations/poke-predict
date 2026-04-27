import type { Card, Prediction } from "../types";

interface Props {
  card?: Card;
  prediction?: Prediction;
}

export function CardDetail({ card, prediction }: Props) {
  if (!card || !prediction) {
    return <div className="rounded-xl bg-terminal-800 p-4 text-slate-400">Select a card to view detail.</div>;
  }

  return (
    <div className="rounded-xl bg-terminal-800 p-4">
      <h2 className="text-lg font-semibold text-white">{card.name}</h2>
      <p className="mt-1 text-sm text-slate-300">{card.set_name} · {card.rarity}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Metric label="Current Price" value={`$${card.current_price.toFixed(2)}`} />
        <Metric label="7-day Trend" value={`${card.trend_7d.toFixed(1)}%`} />
        <Metric label="30-day Trend" value={`${card.trend_30d.toFixed(1)}%`} />
        <Metric label="Prediction Score" value={prediction.upside_score.toFixed(1)} />
        <Metric label="Confidence" value={prediction.confidence_bucket} />
        <Metric label="Horizon" value={prediction.horizon} />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p><span className="text-slate-400">Catalyst Notes:</span> {card.catalyst_notes}</p>
        <p><span className="text-slate-400">Grading Potential:</span> {card.grading_potential}</p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-terminal-700 p-3">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
