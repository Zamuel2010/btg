import React, { useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export default function SwapCard() {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [inputMint, setInputMint] = useState<string>("So11111111111111111111111111111111111111112"); // SOL-wrapped
  const [outputMint, setOutputMint] = useState<string>(process.env.NEXT_PUBLIC_USDC_MINT || "");
  const [amount, setAmount] = useState<string>("0.01");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/jupiter/quote", { inputMint, outputMint, amount });
      setQuote(res.data);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  const doSwap = async () => {
    if (!publicKey) return alert("Connect wallet");
    if (!quote || !quote.data || quote.data[0]?.routes?.length === 0) return alert("No route");
    setLoading(true);
    try {
      // server-side get swap tx info
      const route = quote.data[0].routes[0] || quote.data[0].route;
      const res = await axios.post("/api/jupiter/swap", { route, userPublicKey: publicKey.toBase58() });
      const { swapTransaction } = res.data;
      // swapTransaction is base64; user signs and submits
      const txBuffer = Buffer.from(swapTransaction, "base64");
      const signed = await signTransaction?.(await (window as any).web3.Transaction.from(txBuffer)); // caution: library compatibility
      // swapTransaction signing path depends on wallet adapter
      const txid = await sendTransaction?.(signed!, (await import("@solana/web3.js")).Connection ? undefined : undefined);
      alert("Swap submitted: " + txid);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="swap" className="card w-full max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-2">Swap Tokens (Jupiter)</h2>
      <p className="text-sm text-purple-300/80 mb-4">Quote and swap SPL tokens using Jupiter</p>

      <div className="grid gap-3">
        <div>
          <label className="text-xs">Input mint</label>
          <input value={inputMint} onChange={(e)=>setInputMint(e.target.value)} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1"/>
        </div>

        <div>
          <label className="text-xs">Output mint</label>
          <input value={outputMint} onChange={(e)=>setOutputMint(e.target.value)} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1"/>
        </div>

        <div>
          <label className="text-xs">Amount (raw amount in lamports / token decimals)</label>
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1"/>
        </div>

        <div className="flex gap-2">
          <button onClick={getQuote} className="bg-purple-600 hover:bg-purple-500 rounded-md py-2 font-medium">
            Get Quote
          </button>
          <button onClick={doSwap} disabled={!quote} className="bg-white/10 rounded-md py-2 px-4">
            Execute Swap
          </button>
        </div>

        {quote && (
          <pre className="bg-btg-800 p-3 rounded text-xs overflow-auto mt-2">{JSON.stringify(quote, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
