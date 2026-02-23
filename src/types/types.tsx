import type React from "react";

export type blockchainCard = {
  imageSrc: string;
  blockchainName: blockchain;
  selectedChain: blockchain;
  setSelectedChain: React.Dispatch<React.SetStateAction<blockchain>>;
};

export type WalletContextType = {
  chain: blockchain;
  setChain: React.Dispatch<React.SetStateAction<blockchain>>;
};

export type blockchain = "Bitcoin" | "Ethereum" | "Solana";

export type wallet = {
  name: string;
  address: string;
  publicKey: string;
  privateKey: string;
  chain: string;
  id: number;
};

export type WalletCardProps = {
  wallet: walletsWithData | wallet;
  onRename: (id: number, name: string) => void;
  chainNetwork?: "main" | "dev";
};

export type token = {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
};

export type walletData = {
  balance: number;
  tokens: token[];
  totalBalance: number;
};
export type FetchedData = {
  mainNet: walletData;
  devNet: walletData;
};

export type walletsWithData = wallet & FetchedData;

export type WalletDataResponse = {
  publicKey: string;
  chain: string;
  mainNet: walletData;
  devNet: walletData;
};

export type TransactionDialogProps = {
  wallet: wallet;
  walletData: walletData;
};

export type transactionStatus = "idle" | "Loading" | "Success" | "error";

export interface TransactionFormProps {
  wallet: wallet;
  sendToAddress: string;
  setSendToAddress: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  handleMax: () => void;
  walletData: walletData;
  handleSend: () => void;
}


export interface ToggleChainProps { 
  chain: blockchain,
  setChain: React.Dispatch<React.SetStateAction<blockchain>>;
}

export interface SelectNetworkProps { 
  chainNetwork: "main" | "dev";
  setChainNetwork: React.Dispatch<React.SetStateAction<"main" | "dev">>;
}