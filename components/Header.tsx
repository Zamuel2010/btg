import React from "react";
import WalletConnectButton from "./WalletConnectButton";

export default function Header() {
  return (
    <header className="border-b border-btg-700/40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center font-bold text-black">BTG</div>
          <div>
            <h1 className="font-semibold text-lg">BTG Exchange</h1>
            <p className="text-xs text-purple-300/70">Buy, swap and manage Solana assets</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4 text-sm opacity-90">
            <a href="#buy" className="hover:underline">Buy</a>
            <a href="#swap" className="hover:underline">Swap</a>
            <a href="#dashboard" className="hover:underline">Dashboard</a>
          </nav>
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
