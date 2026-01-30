import type { blockchain } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Buffer } from "buffer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const chainDerivation = {
  Solana: (i: number) => `m/44'/501'/${i}'/0'`,
  Ethereum: (i: number) => `m/44'/60'/${i}'/0/0`,
  Bitcoin: (i: number) => `m/44'/0'/${i}'/0/0`,
};

const WalletGenerator = {
    Solana: (seed: Buffer<ArrayBufferLike>, path: string)=> {
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      return { address: keypair.publicKey.toBase58() , publicKey: keypair.publicKey, privateKey: keypair.secretKey, chain: "Solana" } ;
    },
    Bitcoin: (seed: Buffer<ArrayBufferLike>, path: string) => {},
    Ethereum: (seed: Buffer<ArrayBufferLike>, path: string) => {}
};

export function deriveWalletFromSeed(seed: Buffer<ArrayBufferLike>, chain: blockchain, index: number) {
  const path = chainDerivation[chain](index ?? 0);
  return WalletGenerator[chain](seed,path)
}

export const generateWallet = (chain: blockchain, index: number) => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);  
  const wallet = deriveWalletFromSeed(seed, chain, index);

  return { mnemonic, wallet };
};
