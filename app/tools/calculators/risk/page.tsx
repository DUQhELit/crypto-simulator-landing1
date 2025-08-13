"use client";

import { useState } from 'react';
import { calculatePositionSize } from '../../../../lib/calc';

export default function RiskCalculatorPage() {
  const [accountSize, setAccountSize] = useState(0);
  const [riskPct, setRiskPct] = useState(1);
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopPrice, setStopPrice] = useState(0);
  const [positionSize, setPositionSize] = useState<number | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = calculatePositionSize(accountSize, riskPct, entryPrice, stopPrice);
    setPositionSize(size);
  };

  return (
    <main className="px-4 py-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Position Size Calculator</h1>
      <p className="text-gray-400 mb-4">Determine how many units to buy or sell based on your account size, risk tolerance and stop‑loss placement.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="accountSize" className="block text-sm mb-1">Account Size ($)</label>
          <input id="accountSize" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={accountSize} onChange={(e) => setAccountSize(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="riskPct" className="block text-sm mb-1">Risk % per Trade</label>
          <input id="riskPct" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={riskPct} onChange={(e) => setRiskPct(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="entryPrice" className="block text-sm mb-1">Entry Price ($)</label>
          <input id="entryPrice" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={entryPrice} onChange={(e) => setEntryPrice(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="stopPrice" className="block text-sm mb-1">Stop Price ($)</label>
          <input id="stopPrice" type="number" className="w-full px-2 py-1 rounded bg-gray-800 text-white" value={stopPrice} onChange={(e) => setStopPrice(parseFloat(e.target.value))} />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-dark rounded">Calculate</button>
      </form>
      {positionSize !== null && (
        <div className="mt-6 text-sm">
          <p>Position Size: <strong>{Math.floor(positionSize)}</strong> units</p>
        </div>
      )}
    </main>
  );
}