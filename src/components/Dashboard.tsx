import { useState } from "react";
import { WalletCard } from "./ui/WalletCard";
import type { blockchain, wallet } from "@/types/types";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Dashboard() {
  const [wallets, setWallets] = useState<wallet[]>(() => {
    const wallets = localStorage.getItem("wallets");
    if (wallets) {
      return JSON.parse(wallets);
    }
  });
  const [chain, setChain] = useState<blockchain>();

  return (
    <>
      <div className="w-[80%] flex flex-col items-center h-full gap-5 relative">
        <div className="w-full max-w-4xl">
          <ToggleGroup type="single">
            <ToggleGroupItem value="Solana" onClick={() => setChain("Solana")}>
              Solana
            </ToggleGroupItem>
            <ToggleGroupItem value="Ethereum" onClick={() => setChain("Ethereum")}>
              Ethereum
            </ToggleGroupItem>
            <ToggleGroupItem value="Bitcoin" onClick={() => setChain("Bitcoin")}>
              Bitcoin
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="w-full max-w-4xl">
          <Button className="">New Wallet</Button>
        </div>

        {wallets.map((wallet, index) => (chain == wallet.chain ? <WalletCard {...wallet} /> : null))}
      </div>
    </>
  );
}
