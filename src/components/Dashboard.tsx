import { useState } from "react";
import { WalletCard } from "./ui/WalletCard";
import type { wallet } from "@/types/types";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useWallet } from "@/context/WalletContext";
import { deriveWalletFromSeed } from "@/lib/utils";

export function Dashboard() {
  const [wallets, setWallets] = useState<wallet[]>(() => {
    const wallets = localStorage.getItem("wallets") ?? "[]";
    if (wallets) {
      return JSON.parse(wallets);
    }
  });

  const { chain, setChain } = useWallet();

  return (
    <>
      <div className="w-[80%] flex flex-col items-center h-full gap-5 relative">
        <div className="w-full max-w-4xl">
          <ToggleGroup type="single" defaultValue={chain}>
            <ToggleGroupItem value="Solana" onClick={() => setChain("Solana")}>
              Solana
            </ToggleGroupItem>
            <ToggleGroupItem value="Ethereum" onClick={() => setChain("Ethereum")}>
              Ethereum
            </ToggleGroupItem>
            {/* <ToggleGroupItem value="Bitcoin" onClick={() => setChain("Bitcoin")}>
              Bitcoin
            </ToggleGroupItem> */}
          </ToggleGroup>
        </div>

        <div className="w-full max-w-4xl flex gap-2">
          <Button
            className=""
            onClick={() => {
              const masterSeedHex = localStorage.getItem("masterSeed");
              const TotalWallets = localStorage.getItem("wallets") ?? "[]";
              if (masterSeedHex && TotalWallets) {
                const masterSeed = Buffer.from(masterSeedHex, "hex");
                const wallets: wallet[] = JSON.parse(TotalWallets);

                const wallet = deriveWalletFromSeed(masterSeed, chain, wallets.length + 1);

                if (wallet) {
                  const updatedWallets = [...wallets, wallet];
                  localStorage.setItem("wallets", JSON.stringify(updatedWallets));
                  setWallets(updatedWallets);
                }
              }
            }}
          >
            New Wallet
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("wallets");
              setWallets([])
            }}
          >
            Clear all
          </Button>
        </div>

        {wallets.map((wallet) => (chain == wallet.chain ? <WalletCard {...wallet} /> : null))}
      </div>
    </>
  );
}
