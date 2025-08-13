"use client";

import { useEffect, useState } from 'react';
import { getTopCoins, CoinMarket } from '../../lib/api';
import MarketTable from '../../components/MarketTable';
import AdSlot from '../../components/AdSlot';

const CoinsPage = () => {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const data = await getTopCoins(50);
        setCoins(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Cryptocurrency Directory</h1>
      <p className="text-gray-400 mb-4 max-w-2xl">
        Browse and filter a list of cryptocurrencies by market cap, volume and sector. Click on a coin name to view detailed information, charts and project fundamentals.
      </p>
      {loading ? <p>Loading coins...</p> : <MarketTable coins={coins} />}
      {/* Ad Slot bottom */}
      <AdSlot slotId="coins-bottom" sizes={[[728, 90], [970, 90]]} className="mx-auto mt-8" />
    </main>
  );
};

export default CoinsPage;