import { type blockchain, type WalletContextType } from "@/types/types";
import { createContext, useContext, useState, type ReactNode } from "react";

export const WalletContext = createContext<WalletContextType | null>(null);


export function WalletProvider({children}: {children: ReactNode}) {
    const [chain , setChain] = useState<blockchain>('Solana');

    return (
        <>
            <WalletContext.Provider value={{chain, setChain}} >
                {children}
            </WalletContext.Provider>
        </>
    )
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
