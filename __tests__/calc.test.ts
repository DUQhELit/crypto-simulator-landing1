import {
  calculateExpectedCoinsPerDay,
  calculateRevenue,
  calculatePowerCost,
  calculateProfitPerDay,
  calculateBreakevenDays,
  calculatePnL,
  calculatePositionSize,
} from '../lib/calc';

describe('Mining calculator functions', () => {
  test('expected coins per day should decrease as difficulty increases', () => {
    const coinsLowDiff = calculateExpectedCoinsPerDay(1e12, 6.25, 0, 1e12);
    const coinsHighDiff = calculateExpectedCoinsPerDay(1e12, 6.25, 0, 1e13);
    expect(coinsLowDiff).toBeGreaterThan(coinsHighDiff);
  });

  test('revenue and profit calculations', () => {
    const coins = 0.1;
    const price = 20000;
    const revenue = calculateRevenue(coins, price);
    const powerCost = calculatePowerCost(1200, 0.1);
    const profit = calculateProfitPerDay(revenue, powerCost);
    expect(revenue).toBeCloseTo(2000);
    expect(powerCost).toBeCloseTo(2.88);
    expect(profit).toBeCloseTo(revenue - powerCost);
  });

  test('breakeven days returns Infinity when profit is non-positive', () => {
    const days = calculateBreakevenDays(1000, -5);
    expect(days).toBe(Infinity);
  });
});

describe('Trading calculators', () => {
  test('PnL calculation is correct', () => {
    const { profit, returnPct } = calculatePnL(100, 120, 2);
    expect(profit).toBe(40);
    expect(returnPct).toBeCloseTo(20);
  });

  test('Position size respects risk percentage', () => {
    const size = calculatePositionSize(10000, 2, 50, 45);
    // Risk amount = $200; risk per unit = 5; size = 40 units
    expect(size).toBeCloseTo(40);
  });
});