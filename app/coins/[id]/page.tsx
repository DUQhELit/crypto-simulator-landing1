"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCoinDetail, getCoinMarketChart } from '../../../lib/api';
import { Line } from 'react-chartjs-2';
import AdSlot from '../../../components/AdSlot';

const CoinDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [detail, setDetail] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await getCoinDetail(id);
        const chart = await getCoinMarketChart(id, 30);
        setDetail(data);
        setChartData(chart);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-8">Loading coin data...</p>;
  if (!detail) return <p className="p-8">Coin not found.</p>;

  const prices = chartData.prices || [];
  const labels = prices.map((p: any) => new Date(p[0]).toLocaleDateString());
  const values = prices.map((p: any) => p[1]);

  const data = {
    labels,
    datasets: [
      {
        label: `${detail.name} Price (USD)`,
        data: values,
        borderColor: '#00A3FF',
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
      },
      y: {
        ticks: { color: '#94a3b8' },
      },
    },
  };

  return (
    <main className="px-4 py-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">{detail.name} ({detail.symbol.toUpperCase()})</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="mb-2"><strong>Current Price:</strong> ${detail.market_data.current_price.usd.toLocaleString()}</p>
          <p className="mb-2"><strong>Market Cap:</strong> ${detail.market_data.market_cap.usd.toLocaleString()}</p>
          <p className="mb-2"><strong>Circulating Supply:</strong> {detail.market_data.circulating_supply.toLocaleString()} {detail.symbol.toUpperCase()}</p>
          <p className="mb-2"><strong>Total Supply:</strong> {detail.market_data.total_supply?.toLocaleString() || '—'}</p>
          <p className="mb-2"><strong>Max Supply:</strong> {detail.market_data.max_supply?.toLocaleString() || '—'}</p>
        </div>
        <div>
          <Line data={data} options={options as any} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-8">About {detail.name}</h2>
      <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: detail.description.en || '<p>No description available.</p>' }} />
      <AdSlot slotId="coin-detail" sizes={[[300, 250]]} className="my-8" />
    </main>
  );
};

export default CoinDetailPage;