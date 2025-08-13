"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getGlobalData, getTopCoins, GlobalMarketData, CoinMarket } from '../lib/api';
import MarketTable from '../components/MarketTable';
import AdSlot from '../components/AdSlot';

const HomePage = () => {
  const [global, setGlobal] = useState<GlobalMarketData | null>(null);
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [globalData, topCoins] = await Promise.all([
          getGlobalData(),
          getTopCoins(10),
        ]);
        setGlobal(globalData);
        setCoins(topCoins);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simulate &amp; Learn Crypto. Zero Risk.
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-md">
            Stay ahead in the rapidly evolving world of digital assets. Track live markets, run profitability models and explore in‑depth articles — all from one place.
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search coins..."
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white w-60"
              disabled
            />
            <button className="px-4 py-2 bg-primary text-dark rounded" disabled>
              Search
            </button>
          </div>
          <p className="text-sm text-gray-500">(Search functionality coming soon)</p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/images/mining/hero.png" alt="Crypto hero" width={480} height={360} className="rounded-lg" />
        </div>
      </section>

      {/* Ad Slot Top */}
      <AdSlot slotId="home-top" sizes={[[728, 90], [970, 90]]} className="mx-auto" />

      {/* Market Overview */}
      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
        {loading && <p>Loading data...</p>}
        {global && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
            <div className="p-4 bg-gray-800 rounded">
              <p className="text-sm text-gray-400">Total Market Cap</p>
              <p className="text-lg font-medium">${global.total_market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded">
              <p className="text-sm text-gray-400">24h Volume</p>
              <p className="text-lg font-medium">${global.total_volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded">
              <p className="text-sm text-gray-400">BTC Dominance</p>
              <p className="text-lg font-medium">{global.btc_dominance.toFixed(1)}%</p>
            </div>
            <div className="p-4 bg-gray-800 rounded">
              <p className="text-sm text-gray-400">ETH Dominance</p>
              <p className="text-lg font-medium">{global.eth_dominance.toFixed(1)}%</p>
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">Top Movers</h3>
        {coins.length > 0 ? <MarketTable coins={coins} /> : <p>No data available.</p>}
      </section>

      {/* Ad Slot Sidebar (responsive) */}
      <section className="w-full max-w-6xl">
        <AdSlot slotId="home-content" sizes={[[300, 250], [336, 280]]} className="mx-auto" />
      </section>
    </main>
  );
};

export default HomePage;