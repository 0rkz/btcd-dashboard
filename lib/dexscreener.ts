import { BTCD_TOKEN, DEXSCREENER_API } from "./constants";

export interface BTCDPrice {
  priceUsd: number;
  pegDeviation: number; // percentage off $1.00
  pairAddress: string;
  dexId: string;
}

export async function getBTCDPrice(): Promise<BTCDPrice | null> {
  try {
    const res = await fetch(`${DEXSCREENER_API}/${BTCD_TOKEN}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const pairs = json.pairs;

    if (!pairs || pairs.length === 0) return null;

    // Filter by highest liquidity to avoid spoofed low-liquidity pools
    const bestPair = pairs.reduce(
      (best: { liquidity?: { usd?: number } }, pair: { liquidity?: { usd?: number } }) =>
        (pair.liquidity?.usd ?? 0) > (best.liquidity?.usd ?? 0) ? pair : best,
      pairs[0]
    );

    const priceUsd = parseFloat(bestPair.priceUsd ?? "0");
    if (isNaN(priceUsd) || priceUsd === 0) return null;

    const pegDeviation = Math.abs((priceUsd - 1.0) / 1.0) * 100;

    return {
      priceUsd,
      pegDeviation: Math.round(pegDeviation * 100) / 100,
      pairAddress: bestPair.pairAddress ?? "",
      dexId: bestPair.dexId ?? "",
    };
  } catch {
    return null;
  }
}
