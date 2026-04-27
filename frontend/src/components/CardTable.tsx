import type { Card, Prediction } from "../types";

interface Props {
  rows: Array<{ card: Card; prediction: Prediction }>;
  onSelect: (id: number) => void;
}

export function CardTable({ rows, onSelect }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl bg-terminal-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-terminal-700 text-xs uppercase tracking-wider text-slate-300">
          <tr>
            <th className="p-3">Card</th>
            <th className="p-3">Set</th>
            <th className="p-3">Price</th>
            <th className="p-3">7D</th>
            <th className="p-3">30D</th>
            <th className="p-3">Upside</th>
            <th className="p-3">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ card, prediction }) => (
            <tr
              key={prediction.id}
              className="cursor-pointer border-t border-terminal-700 hover:bg-terminal-700/70"
              onClick={() => onSelect(card.id)}
            >
              <td className="p-3 font-medium text-white">{card.name}</td>
              <td className="p-3">{card.set_name}</td>
              <td className="p-3">${card.current_price.toFixed(2)}</td>
              <td className={`p-3 ${card.trend_7d >= 0 ? "text-green-400" : "text-red-400"}`}>
                {card.trend_7d >= 0 ? "+" : ""}
                {card.trend_7d.toFixed(1)}%
              </td>
              <td className={`p-3 ${card.trend_30d >= 0 ? "text-green-400" : "text-red-400"}`}>
                {card.trend_30d >= 0 ? "+" : ""}
                {card.trend_30d.toFixed(1)}%
              </td>
              <td className="p-3 text-terminal-accent">{prediction.upside_score.toFixed(1)}</td>
              <td className="p-3 capitalize">{prediction.confidence_bucket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
