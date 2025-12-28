import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then(r => r.data);

export default function Dashboard() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const { data: stats } = useSWR("/api/stats", fetcher, { refreshInterval: 30000 });

  useEffect(() => {
    async function load() {
      if (!publicKey) return;
      const res = await fetch(`/api/wallet/balance?pubkey=${publicKey.toBase58()}`);
      const json = await res.json();
      setBalance(json.balance);
    }
    load();
  }, [publicKey]);

  return (
    <div id="dashboard" className="card w-full mt-6">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-3 border border-btg-700 rounded">
          <div className="text-sm text-purple-300">Wallet Balance</div>
          <div className="text-2xl font-semibold">{balance !== null ? `${(balance / 1e9).toFixed(6)} SOL` : "—"}</div>
        </div>

        <div className="p-3 border border-btg-700 rounded">
          <div className="text-sm text-purple-300">Total Volume</div>
          <div className="text-2xl font-semibold">₦{stats?.totalVolume ?? 0}</div>
        </div>

        <div className="p-3 border border-btg-700 rounded">
          <div className="text-sm text-purple-300">Users</div>
          <div className="text-2xl font-semibold">{stats?.usersCount ?? 0}</div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Recent Transactions</h3>
        <div className="space-y-2">
          {(stats?.recentTxs || []).map((t: any) => (
            <div key={t.id} className="p-2 border border-btg-700 rounded flex justify-between items-center">
              <div>
                <div className="text-sm">{t.kind}</div>
                <div className="text-xs opacity-80">{t.txHash}</div>
              </div>
              <div className="text-sm">{t.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
