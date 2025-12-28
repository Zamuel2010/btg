import { FC } from "react";
import dynamic from "next/dynamic";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider as AdapterWalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter
} from "@solana/wallet-adapter-wallets";

// The UI from wallet-adapter relies on DOM (do dynamic import for SSR)
const WalletModalProvider = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletModalProvider),
  { ssr: false }
);

// Default styles for wallet adapter UI
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const network = process.env.NEXT_PUBLIC_CLUSTER_URL?.includes("devnet") ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_CLUSTER_URL || "https://api.mainnet-beta.solana.com";

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new BackpackWalletAdapter()
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <AdapterWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </AdapterWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
