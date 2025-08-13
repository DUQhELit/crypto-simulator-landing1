"use client";

import MiningCalculator from '../../../../components/CalculatorForm';

export default function MiningPage() {
  return (
    <main className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mining Profitability Calculator</h1>
      <p className="text-gray-400 mb-4 max-w-2xl">
        Estimate how many coins you can mine per day, your expected revenue, power costs and the time needed to break even. Adjust the parameters based on your hardware and market conditions.
      </p>
      <MiningCalculator />
    </main>
  );
}