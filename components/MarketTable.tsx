import React from 'react';
import type { CoinMarket } from '../lib/api';

interface MarketTableProps {
  coins: CoinMarket[];
}

export const MarketTable: React.FC<MarketTableProps> = ({ coins }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800 uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Rank</th>
            <th scope="col" className="px-4 py-3">Name</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">24h %</th>
            <th scope="col" className="px-4 py-3">Market Cap</th>
            <th scope="col" className="px-4 py-3">Volume 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-700">
              <td className="px-4 py-3 whitespace-nowrap">{idx + 1}</td>
              <td className="px-4 py-3 whitespace-nowrap font-medium text-white">
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td className="px-4 py-3">${coin.price.toLocaleString()}</td>
              <td className="px-4 py-3">
                <span className={coin.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {coin.percent_change_24h.toFixed(2)}%
                </span>
              </td>
              <td className="px-4 py-3">${coin.market_cap.toLocaleString()}</td>
              <td className="px-4 py-3">${coin.volume_24h.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;