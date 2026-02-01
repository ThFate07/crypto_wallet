import type React from "react";

export type blockchainCard = { 
    imageSrc: string,
    blockchainName: blockchain,
    selectedChain: blockchain,
    setSelectedChain: React.Dispatch<React.SetStateAction<blockchain>>
}

export type WalletContextType = {
  chain: blockchain;
  setChain: React.Dispatch<React.SetStateAction<blockchain>>;
};

export type blockchain = 'Bitcoin' | 'Ethereum' | 'Solana';

export type wallet = { name: string, address: string , publicKey: string, privateKey: string, chain: string, id: number}

export type WalletCardProps = { 
  wallet: wallet,
  onRename: (id: number, name: string) => void
}