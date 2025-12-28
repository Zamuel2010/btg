import React, { useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";

export default function BuyCard() {
  const { publicKey } = useWallet();
  const [amountNGN, setAmountNGN] = useState(5000);
  const [currency, setCurrency] = useState<"SOL" | "USDC">("SOL");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!publicKey) return alert("Connect wallet first");
    setLoading(true);
    try {
      const res = await axios.post("/api/paystack/checkout", {
        email,
        amountNGN,
        wallet: publicKey.toBase58(),
        currency
      });
      // redirect user to paystack authorization url
      window.location.href = res.data.authorization_url;
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="buy" className="card w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Buy Crypto (NGN)</h2>
      <p className="text-sm text-purple-300/80 mb-4">Pay with Paystack — funds will be delivered to your connected wallet after verification.</p>

      <div className="grid gap-3">
        <div>
          <label className="text-xs">Your email (Paystack receipt)</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1" placeholder="you@example.com"/>
        </div>

        <div>
          <label className="text-xs">Amount (NGN)</label>
          <input type="number" value={amountNGN} onChange={(e)=>setAmountNGN(Number(e.target.value))} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1"/>
        </div>

        <div>
          <label className="text-xs">Deliver as</label>
          <select value={currency} onChange={(e)=>setCurrency(e.target.value as any)} className="w-full rounded-md bg-transparent border border-btg-700 p-2 mt-1">
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <button onClick={handleCheckout} disabled={loading} className="bg-purple-600 hover:bg-purple-500 rounded-md py-2 font-medium">
          {loading ? "Starting checkout..." : `Pay ₦${amountNGN} via Paystack`}
        </button>
      </div>
    </div>
  );
}
