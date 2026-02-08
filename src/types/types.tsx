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
  wallet: walletsWithData,
  onRename: (id: number, name: string) => void,
  chainNetwork?: 'main' | 'dev'
}

export type WalletCardEditProps = { 
  wallet: wallet,
  onRename: (id: number, name: string) => void,
}

export type token = { 
  mint: string,
  amount: number,
  decimals: number,
  symbol?: string
}
export type walletsWithData = wallet & { 
  mainNet: { 
    solBalance: number,
    tokens: token[]
    totalBalance: number
  },
  devNet : { 
    solBalance: number,
    tokens: token[]
    totalBalance: number
  }
};



export type WalletDataResponse = { 
  publicKey: string,
  chain: string,
   mainNet: { 
    solBalance: number,
    tokens: token[]
    totalBalance: number
  },
  devNet : { 
    solBalance: number,
    tokens: token[]
    totalBalance: number
  }

}