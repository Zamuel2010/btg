import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const clusterUrl = process.env.NEXT_PUBLIC_CLUSTER_URL || "https://api.mainnet-beta.solana.com";
export const connection = new Connection(clusterUrl, "confirmed");

let serviceKeypair: Keypair | null = null;

export function getServiceKeypair(): Keypair {
  if (serviceKeypair) return serviceKeypair;

  const raw = process.env.SERVICE_WALLET_KEYPAIR_JSON;
  if (!raw) throw new Error("SERVICE_WALLET_KEYPAIR_JSON not set");
  let arr: number[] = [];
  try {
    arr = JSON.parse(raw);
  } catch (e) {
    // try base58 or base64 decode
    try {
      const decoded = bs58.decode(raw);
      const secret = Uint8Array.from(decoded);
      serviceKeypair = Keypair.fromSecretKey(secret);
      return serviceKeypair;
    } catch (err) {
      throw new Error("Failed to parse SERVICE_WALLET_KEYPAIR_JSON");
    }
  }
  serviceKeypair = Keypair.fromSecretKey(Uint8Array.from(arr));
  return serviceKeypair;
}
