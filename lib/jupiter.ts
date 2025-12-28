import axios from "axios";

const JUPITER_BASE = process.env.JUPITER_API_URL || "https://quote-api.jup.ag";

export async function jupiterQuote(inputMint: string, outputMint: string, amount: string, slippageBps = 50) {
  const res = await axios.get(`${JUPITER_BASE}/v4/quote`, {
    params: {
      inputMint,
      outputMint,
      amount,
      slippageBps
    }
  });
  return res.data;
}

/**
 * Jupiter swap endpoint (server-side to fetch swap transaction info to be signed by user).
 * See Jupiter docs: /v4/swap
 */
export async function jupiterSwap(route: any, userPublicKey: string) {
  // route: returned route from quote selected by client (full route object)
  const res = await axios.post(`${JUPITER_BASE}/v4/swap`, {
    route,
    userPublicKey
  });
  return res.data;
}
