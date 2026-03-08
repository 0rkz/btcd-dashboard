import { DEFILLAMA_API, BTCFI_PROTOCOLS } from "./constants";

export interface ChainTVL {
  name: string;
  tvl: number;
}

export async function getBTCFiTVLs(): Promise<ChainTVL[]> {
  try {
    const res = await fetch(`${DEFILLAMA_API}/v2/chains`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const allChains: { name: string; tvl: number }[] = await res.json();

    return BTCFI_PROTOCOLS.map((name) => {
      const found = allChains.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      return { name, tvl: found?.tvl ?? 0 };
    }).sort((a, b) => b.tvl - a.tvl);
  } catch {
    return [];
  }
}
