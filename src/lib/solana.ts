import type { wallet } from "@/types/types";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";

const heliusAPI = import.meta.env.VITE_HELIUS_API;
const main = new Connection(`https://mainnet.helius-rpc.com/?api-key=${heliusAPI}`, "confirmed");
const dev = new Connection("https://api.devnet.solana.com", "confirmed");

export const solanaConnections = {
  main,
  dev,
};


export const getAccountInfo = async (publicKey: string, connectionType: "main" | "dev") => {
  const address = new PublicKey(publicKey);
  const accountInfo = await solanaConnections[connectionType].getAccountInfo(address);
  return accountInfo;
};


// only solana for now
export async function requestAirdrop(pubKey: string, chain: string) {
  if (chain != "Solana") throw new Error("ONLY SOLANA SUPPORTED FOR NOW");
  const response = await axios.post("http://localhost:3000/requestSolAirdrop", { pubKey });
  if (response.data?.result) {
    return response.data?.result;
  }
}

export async function sendTransaction(
  wallet: wallet,
  chainNetwork: "main" | "dev",
  sendToAddress: string,
  amount: number,
) {
  const { blockhash, lastValidBlockHeight } = await solanaConnections[chainNetwork].getLatestBlockhash();
  const sender = Keypair.fromSecretKey(Buffer.from(wallet.privateKey, "hex"));

  const transactionInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: new PublicKey(sendToAddress),
    lamports: amount * LAMPORTS_PER_SOL,
  });

  const transaction = new Transaction({
    blockhash,
    lastValidBlockHeight,
    feePayer: new PublicKey(wallet.publicKey),
  }).add(transactionInstruction);

  return  await sendAndConfirmTransaction(solanaConnections[chainNetwork], transaction, [sender]);

}
