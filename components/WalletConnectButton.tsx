import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletConnectButton() {
  const wallet = useWallet();
  return (
    <div>
      {/* WalletMultiButton provides connect/disconnect and shows pubkey */}
      <WalletMultiButton />
    </div>
  );
}
