import { useEffect, useState } from "react";
import { WalletCard } from "./ui/WalletCard";
import { type blockchain, type wallet, type walletsWithData } from "@/types/types";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { aggregateWalletData, deriveWalletFromSeed } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

export function Dashboard() {
  const [wallets, setWallets] = useState<wallet[]>(() => {
    const wallets = localStorage.getItem("wallets") ?? "[]";
    if (wallets) {
      return JSON.parse(wallets);
    }

    return [];
  });
  const [chain, setChain] = useState<blockchain>("Solana");
  const [chainNetwork, setChainNetwork] = useState<"main" | "dev">("main");
  const [walletsWithData, setWalletsWithData] = useState<walletsWithData[]>([]);

  function onRename(id: number, name: string) {
    const oldWallets: wallet[] = JSON.parse(localStorage.getItem("wallets") ?? "[]");

    if (oldWallets) {
      const newWallets = oldWallets.map(wallet => {
        if (wallet.id === id) {
          return { ...wallet, name };
        }

        return wallet;
      });

      setWallets(newWallets);
      localStorage.setItem("wallets", JSON.stringify(newWallets));
    }
  }

  useEffect(() => {
    const fetchBalance = async (wallets: wallet[]) => {
      const data = wallets.map(w => ({ publicKey: w.address, chain: w.chain }));
      const url = "http://localhost:3000/fetch-wallet-details";
      const response = await axios.post(url, { wallets: data });

      if (response.data.message === "successfull") {
        const finalWallet = aggregateWalletData(wallets, response.data.walletWithPrices);
        console.log(finalWallet)
        setWalletsWithData(finalWallet);
      }
    };

    fetchBalance(wallets);
  }, [wallets]);

  return (
    <>
      <div className="w-[80%] flex flex-col items-center h-full gap-5 relative">
        <div className="flex w-full max-w-4xl justify-between">
          <div>
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

          <div>
            <Select value={chainNetwork} onValueChange={v => setChainNetwork(v as "main" | "dev")}>
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="main">Main Net</SelectItem>
                  <SelectItem value="dev">Dev net</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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

                const wallet = deriveWalletFromSeed(
                  masterSeed,
                  chain,
                  wallets.filter(wallet => wallet.chain == chain).length,
                );

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
              setWallets([]);
            }}
          >
            Clear all
          </Button>
        </div>

        {wallets &&
          wallets
            .filter(wallet => wallet.chain == chain)
            .map(wallet => {
              const enriched  = walletsWithData.find(w => w.id === wallet.id)
              return ( 
              
                <WalletCard key={wallet.id} wallet={enriched ?? wallet} onRename={onRename} chainNetwork={chainNetwork} />
              )
            })}
      </div>
    </>
  );
}
