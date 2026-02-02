import { useEffect, useState } from "react";
import { WalletCard } from "./ui/WalletCard";
import type { TokenBalances, wallet, walletsWithData } from "@/types/types";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useWallet } from "@/context/WalletContext";
import { deriveWalletFromSeed } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBalance, getPrices } from "@/lib/solana";

export function Dashboard() {
  const [wallets, setWallets] = useState<wallet[]>(() => {
    const wallets = localStorage.getItem("wallets") ?? "[]";
    if (wallets) {
      return JSON.parse(wallets);
    }

    return [];
  });
  const { chain, setChain } = useWallet();
  const [chainNetwork, setChainNetwork] = useState<"main" | "dev">("main");
  const [walletsWithData, setWalletsWithData] = useState<walletsWithData[]>()

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
    // get all the wallets, for each  wallet fetch their tokenBalances and add unique mint address to a list.
    // after that is done we use that mint address to fetch the current prices and then do the calculation and add that data to the wallet

    const fetchBalance = async () => {
      const baseWallet = [...wallets];
      const uniqueMintAddress = new Map();

      const walletsWithData: walletsWithData[] = await Promise.all(baseWallet.map(async w => {
        const data = await getBalance(w.publicKey, chainNetwork);
        const tokenBalances: TokenBalances = {
          'So11111111111111111111111111111111111111112': {
            amount: data.nativeBalance,
            symbol: "SOL",
          },
        };

        uniqueMintAddress.set('So11111111111111111111111111111111111111112', 1);
        
        data.tokens.map(({ mint, amount, symbol }: { mint?: string; amount?: number; symbol?: string }) => {

          if (!mint || !symbol) return;
          
          uniqueMintAddress.set(mint, 1)
          tokenBalances[mint] = {
            amount: amount ?? 0,
            symbol,
          };
        });

        return { 
          ...w,
          tokenBalances
        }
        
      }));
      
      const currentPrices = await getPrices(Array.from(uniqueMintAddress.keys()));
      console.log(uniqueMintAddress)
      
      walletsWithData.forEach(wallet => { 
        let totalUsd = 0;
        for (const [mint, bal] of Object.entries(wallet.tokenBalances)) { 
          const price = currentPrices[mint]?.usd ?? 0;
          totalUsd += bal.amount * price
        }
        wallet.totalUsd = totalUsd;
      })

      setWalletsWithData(walletsWithData)
    };

    fetchBalance();    
  }, [wallets, chainNetwork]);

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
              setWallets([]);
            }}
          >
            Clear all
          </Button>
        </div>

        {walletsWithData && walletsWithData.map(wallet =>
          chain == wallet.chain ? (
            <WalletCard key={wallet.id} wallet={wallet} onRename={onRename} chainNetwork={chainNetwork} />
          ) : null,
        )}
      </div>
    </>
  );
}
