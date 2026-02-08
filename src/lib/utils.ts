import type { blockchain, wallet, WalletDataResponse, walletsWithData } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Buffer } from "buffer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { ethers } from 'ethers';
import HDNode from 'hdkey'
import { toast } from "sonner";

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
      const id = Date.now()
      return { address: keypair.publicKey.toBase58() , publicKey: keypair.publicKey.toBase58(), privateKey: Buffer.from(keypair.secretKey).toString('hex'), chain: "Solana", name: "New Wallet", id } ;
    },
    Bitcoin: (seed: Buffer<ArrayBufferLike>, path: string) => {
      const hdKey = HDNode.fromMasterSeed(seed)
      const derivedSeed = hdKey.derive(path)
      console.log(derivedSeed)
    },
    Ethereum: (seed: Buffer<ArrayBufferLike>, path: string) => {
      const rootNode = ethers.HDNodeWallet.fromSeed(seed);
      const wallet = rootNode.derivePath(path)
      const id = Date.now()
      return {address: wallet.address, publicKey: wallet.publicKey, privateKey: wallet.privateKey, chain: "Ethereum", name: "New Wallet", id}
    }
};

export function deriveWalletFromSeed(seed: Buffer<ArrayBufferLike>, chain: blockchain, index: number) {
  const path = chainDerivation[chain](index ?? 0);
  return WalletGenerator[chain](seed,path)
}

export const generateWallet = (chain: blockchain, index: number) => {
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);  
  const wallet = deriveWalletFromSeed(seed, chain, index);
  
  localStorage.setItem('wallets', JSON.stringify([wallet]))
  localStorage.setItem('masterSeed', seed.toString('hex'));
  return { mnemonic, wallet };
};


export function handleCopy(toCopyString: string, toastMsg: string){ 
  navigator.clipboard.writeText(toCopyString);
  toast(toastMsg, { position: "bottom-right" });             
}

export function aggregateWalletData(wallets: wallet[], walletData: WalletDataResponse[]) { 
  const finalWalletData = wallets.map(wallet => { 

    const curWalletData = walletData.find(wd => wd.publicKey === wallet.publicKey);

    if (!curWalletData) return null;

    return { 
      ...wallet,
      mainNet: curWalletData.mainNet,
      devNet: curWalletData.devNet
      
    }
  }).filter(w => w !== null) as walletsWithData[];

  return finalWalletData
}