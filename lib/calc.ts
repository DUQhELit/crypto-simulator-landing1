// Calculation utilities for the crypto simulators.

// Expected coins per day for mining profitability.
export function calculateExpectedCoinsPerDay(
  hashrate: number, // in hashes per second
  blockReward: number, // coins per block
  poolFee: number, // 0–1
  difficulty: number
): number {
  const secondsPerDay = 86400;
  // 2^32 is the share difficulty constant used by many mining algorithms.
  const constant = Math.pow(2, 32);
  return (hashrate * secondsPerDay * blockReward * (1 - poolFee)) / (difficulty * constant);
}

// Mining revenue in USD per day.
export function calculateRevenue(
  expectedCoinsPerDay: number,
  price: number // current coin price
): number {
  return expectedCoinsPerDay * price;
}

// Power cost per day given power consumption in watts and electricity cost per kWh.
export function calculatePowerCost(
  powerWatts: number,
  electricityCost: number // cost per kWh
): number {
  return (powerWatts / 1000) * 24 * electricityCost;
}

// Profit per day: revenue minus power cost.
export function calculateProfitPerDay(revenue: number, powerCost: number): number {
  return revenue - powerCost;
}

// Breakeven days given hardware cost and daily profit.
export function calculateBreakevenDays(hardwareCost: number, profitPerDay: number): number {
  return profitPerDay > 0 ? hardwareCost / profitPerDay : Infinity;
}

// Position P&L: profit or loss for a position given entry, exit prices and quantity.
export function calculatePnL(
  entryPrice: number,
  exitPrice: number,
  quantity: number
): { profit: number; returnPct: number } {
  const profit = (exitPrice - entryPrice) * quantity;
  const returnPct = entryPrice > 0 ? (profit / (entryPrice * quantity)) * 100 : 0;
  return { profit, returnPct };
}

// Position sizing given risk percentage and stop-loss distance.
export function calculatePositionSize(
  accountSize: number,
  riskPct: number,
  entryPrice: number,
  stopPrice: number
): number {
  const riskAmount = accountSize * (riskPct / 100);
  const riskPerUnit = Math.abs(entryPrice - stopPrice);
  return riskPerUnit > 0 ? riskAmount / riskPerUnit : 0;
}