import { useEffect, useState } from "react";
import { WalletCard } from "./ui/WalletCard";
import { type blockchain, type wallet, type walletsWithData } from "@/types/types";
import { Button } from "./ui/button";
import { aggregateWalletData, createNewWallet } from "@/lib/utils";
import axios from "axios";
import { ToggleChain } from "./ToggleChain";
import { SelectNetwork } from "./SelectNetwork";
import { toast } from "sonner";

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
    const updatedWallets = wallets.map(wallet => {
      if (wallet.id === id) {
        return { ...wallet, name };
      }

      return wallet;
    });

    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
  }

  const fetchBalance = async (walletList?: wallet[]) => {
    const lists = walletList ?? wallets;
    if (!lists?.length) {
      return;
    }

    try {
      const data = lists.map(w => ({ publicKey: w.address, chain: w.chain }));
      const url = "https://crypto-wallet-backend-mhjg.onrender.com/fetch-wallet-details";
      const response = await axios.post(url, { wallets: data });

      if (response.data.message === "successfull") {
        const finalWallet = aggregateWalletData(lists, response.data.walletWithPrices);
        console.log(finalWallet);
        setWalletsWithData(finalWallet);
        return;
      }
    } catch (error) {
      console.log(error);
      // show error in fetching data as a toast or something
      toast("Error fetching wallets data")
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <div className="w-[80%] flex flex-col items-center h-full gap-5 relative">
        <div className="flex w-full max-w-4xl justify-between">
          <ToggleChain chain={chain} setChain={setChain} />

          <SelectNetwork chainNetwork={chainNetwork} setChainNetwork={setChainNetwork} />
        </div>

        <div className="w-full max-w-4xl flex gap-2">
          <Button
            className=""
            onClick={() => {
              const updatedWallets = createNewWallet(chain, setWallets);
              fetchBalance(updatedWallets)
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
              const enriched = walletsWithData.find(w => w.id === wallet.id);
              return (
                <WalletCard
                  key={wallet.id}
                  wallet={enriched ?? wallet}
                  onRename={onRename}
                  chainNetwork={chainNetwork}
                  fetchBalance={() => fetchBalance(wallets)}
                  chain={chain}
                />
              );
            })}
      </div>
    </>
  );
}
