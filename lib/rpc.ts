/**
 * Generic JSON-RPC fetch helper with Next.js ISR caching.
 * All RPC calls go through native fetch() to leverage Next.js cache.
 */

interface RpcCallParams {
  rpcUrl: string;
  to: string;
  data: string;
  revalidate?: number;
}

export async function ethCall({
  rpcUrl,
  to,
  data,
  revalidate = 60,
}: RpcCallParams): Promise<string> {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_call",
      params: [{ to, data }, "latest"],
      id: 1,
    }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`RPC call failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(`RPC error: ${json.error.message}`);
  }

  return json.result;
}

/**
 * Encode an address as a 32-byte ABI parameter.
 */
export function encodeAddress(address: string): string {
  return address.slice(2).toLowerCase().padStart(64, "0");
}
