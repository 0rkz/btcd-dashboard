import { COINGECKO_API } from "./constants";

export interface ELAData {
  price: number;
  marketCap: number;
  marketCapRank: number | null;
}

export async function getELAData(): Promise<ELAData> {
  const res = await fetch(
    `${COINGECKO_API}/coins/elastos?localization=false&tickers=false&community_data=false&developer_data=false`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`CoinGecko ELA fetch failed: ${res.status}`);
  }

  const json = await res.json();

  return {
    price: json.market_data?.current_price?.usd ?? 0,
    marketCap: json.market_data?.market_cap?.usd ?? 0,
    marketCapRank: json.market_cap_rank ?? null,
  };
}
