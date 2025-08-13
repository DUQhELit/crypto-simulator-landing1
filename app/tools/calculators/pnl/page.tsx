"use client";

import { useState } from 'react';
import { calculatePnL } from '../../../../lib/calc';

export default function PnLPage() {
  const [entryPrice, setEntryPrice] = useState(0);
  const [exitPrice, setExitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [result, setResult] = useState<{ profit: number; returnPct: number } | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculatePnL(entryPrice, exitPrice, quantity));
  };

  return (
    <main className="px-4 py-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Position P&L Calculator</h1>
      <p className="text-gray-400 mb-4">Calculate the profit or loss of a trade given your entry price, exit price and quantity.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="entry" className="block text-sm mb-1">Entry Price ($)</label>
          <input id="entry" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={entryPrice} onChange={(e) => setEntryPrice(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="exit" className="block text-sm mb-1">Exit Price ($)</label>
          <input id="exit" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={exitPrice} onChange={(e) => setExitPrice(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="qty" className="block text-sm mb-1">Quantity</label>
          <input id="qty" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-dark rounded">Calculate</button>
      </form>
      {result && (
        <div className="mt-6 text-sm space-y-2">
          <p>Profit / Loss: <strong>${result.profit.toFixed(2)}</strong></p>
          <p>Return (%): <strong>{result.returnPct.toFixed(2)}%</strong></p>
        </div>
      )}
    </main>
  );
}