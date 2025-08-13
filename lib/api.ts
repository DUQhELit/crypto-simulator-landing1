// API helper functions to fetch crypto data from CoinGecko.
// These functions are thin wrappers around the CoinGecko REST API.

export interface GlobalMarketData {
  total_market_cap: number;
  total_volume: number;
  btc_dominance: number;
  eth_dominance: number;
}

export interface CoinMarket {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percent_change_24h: number;
  market_cap: number;
  volume_24h: number;
}

const API_BASE = process.env.COIN_API_BASE || 'https://api.coingecko.com/api/v3';

// Fetch global market data summarising the crypto market cap, volume and dominance.
export async function getGlobalData(): Promise<GlobalMarketData> {
  const res = await fetch(`${API_BASE}/global`);
  if (!res.ok) throw new Error('Failed to fetch global data');
  const data = await res.json();
  return {
    total_market_cap: data.data.total_market_cap.usd,
    total_volume: data.data.total_volume.usd,
    btc_dominance: data.data.market_cap_percentage.btc,
    eth_dominance: data.data.market_cap_percentage.eth,
  };
}

// Fetch a list of coins with market metrics. Limit parameter determines the number of coins.
export async function getTopCoins(limit = 10): Promise<CoinMarket[]> {
  const res = await fetch(
    `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
  );
  if (!res.ok) throw new Error('Failed to fetch top coins');
  const data = await res.json();
  return data.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: coin.current_price,
    percent_change_24h: coin.price_change_percentage_24h_in_currency,
    market_cap: coin.market_cap,
    volume_24h: coin.total_volume,
  }));
}

// Fetch detailed data for a particular coin by ID.
export async function getCoinDetail(id: string) {
  const res = await fetch(
    `${API_BASE}/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
  );
  if (!res.ok) throw new Error('Failed to fetch coin detail');
  return res.json();
}

// Fetch historical market chart data for a coin.
export async function getCoinMarketChart(id: string, days: number = 30) {
  const res = await fetch(
    `${API_BASE}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
  );
  if (!res.ok) throw new Error('Failed to fetch chart data');
  return res.json();
}