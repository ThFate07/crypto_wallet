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
  seed: string | null;
  setSeed: React.Dispatch<React.SetStateAction<string | null>>;
};

export type blockchain = 'Bitcoin' | 'Ethereum' | 'Solana';