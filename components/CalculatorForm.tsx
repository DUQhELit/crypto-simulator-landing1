import React, { useState } from 'react';
import {
  calculateExpectedCoinsPerDay,
  calculateRevenue,
  calculatePowerCost,
  calculateProfitPerDay,
  calculateBreakevenDays,
} from '../lib/calc';

interface MiningInputs {
  hashrate: number;
  blockReward: number;
  difficulty: number;
  powerWatts: number;
  electricityCost: number;
  poolFee: number;
  hardwareCost: number;
  price: number;
}

const MiningCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<MiningInputs>({
    hashrate: 100_000_000_000, // 100 GH/s default
    blockReward: 6.25,
    difficulty: 30e12,
    powerWatts: 1500,
    electricityCost: 0.12,
    poolFee: 0.02,
    hardwareCost: 2000,
    price: 30000,
  });
  const [results, setResults] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coinsPerDay = calculateExpectedCoinsPerDay(
      inputs.hashrate,
      inputs.blockReward,
      inputs.poolFee,
      inputs.difficulty
    );
    const revenue = calculateRevenue(coinsPerDay, inputs.price);
    const powerCost = calculatePowerCost(inputs.powerWatts, inputs.electricityCost);
    const profitPerDay = calculateProfitPerDay(revenue, powerCost);
    const breakeven = calculateBreakevenDays(inputs.hardwareCost, profitPerDay);
    setResults({ coinsPerDay, revenue, powerCost, profitPerDay, breakeven });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Mining Profitability Calculator</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="hashrate">Hashrate (H/s)</label>
          <input
            id="hashrate"
            name="hashrate"
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.hashrate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="blockReward">Block Reward (coins)</label>
          <input
            id="blockReward"
            name="blockReward"
            type="number"
            step="0.0001"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.blockReward}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="difficulty">Network Difficulty</label>
          <input
            id="difficulty"
            name="difficulty"
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.difficulty}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="powerWatts">Power (W)</label>
          <input
            id="powerWatts"
            name="powerWatts"
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.powerWatts}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="electricityCost">Electricity Cost ($/kWh)</label>
          <input
            id="electricityCost"
            name="electricityCost"
            type="number"
            step="0.001"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.electricityCost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="poolFee">Pool Fee (%)</label>
          <input
            id="poolFee"
            name="poolFee"
            type="number"
            step="0.001"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.poolFee}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="hardwareCost">Hardware Cost ($)</label>
          <input
            id="hardwareCost"
            name="hardwareCost"
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.hardwareCost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="price">Coin Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-900 text-white"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-4 py-2 bg-primary text-dark rounded">Calculate</button>
        </div>
      </form>
      {results && (
        <div className="mt-6 space-y-2 text-sm">
          <p>Expected Coins/Day: <strong>{results.coinsPerDay.toExponential(6)}</strong></p>
          <p>Revenue/Day: <strong>${results.revenue.toFixed(2)}</strong></p>
          <p>Power Cost/Day: <strong>${results.powerCost.toFixed(2)}</strong></p>
          <p>Profit/Day: <strong>${results.profitPerDay.toFixed(2)}</strong></p>
          <p>Breakeven Days: <strong>{results.breakeven === Infinity ? 'Never' : results.breakeven.toFixed(2)}</strong></p>
        </div>
      )}
    </div>
  );
};

export default MiningCalculator;