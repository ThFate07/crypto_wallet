import type { wallet } from "@/types/types";
import { ethers, Wallet } from "ethers";

const ethConnections = {
  main: new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/ao0uAJYb3-jT47_r72uyT"),
  dev: new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/ao0uAJYb3-jT47_r72uyT"),
};

export async function sendEthTransaction(wallet: wallet,chain: "main" | "dev", sendToAddress: string, amount: number ) {
  const iniWallet = new Wallet(wallet.privateKey);
  const provider = ethConnections[chain];

  const signer = iniWallet.connect(provider);

  const tx = await signer.sendTransaction({
    to: sendToAddress,
    value: ethers.parseEther(amount.toString()),
  });

  const status = await tx.wait();

  if (!status) throw new Error("Ethereum transaction failed");

  return tx.hash;
}
