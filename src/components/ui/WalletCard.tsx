import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Copy, Check } from "lucide-react";
import { filterWalletTokenData, handleCopy } from "@/lib/utils";
import { useState } from "react";
import type { TransactionDialogProps, WalletCardProps } from "@/types/types";
import { requestAirdropSafe } from "@/lib/solana";

function WalletEditForm({ wallet, onRename, chainNetwork }: WalletCardProps) {
  const [name, setName] = useState(wallet.name);
  const [requestAirdropLoading, setRequestAirdropLoading] = useState(false);
  const [requestAirdropStatus, setRequestAirdropStatus] = useState<"Success" | "failed" | null>(null);

  async function handleAirdropRequest() {
    try {
      setRequestAirdropLoading(true);
      const response = await requestAirdropSafe(wallet.publicKey, wallet.chain);
      if (response) setRequestAirdropStatus("Success");
    } catch (error) {
      console.log(error);
      setRequestAirdropStatus("failed");
    } finally {
      setRequestAirdropLoading(false);
      setTimeout(() => {
        setRequestAirdropStatus(null);
      }, 3000);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label>Edit wallet name</label>
          <Input value={name} onChange={e => setName(e.target.value)}></Input>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <label>Public Address: </label>
            <div className="flex items-center relative">
              <Input value={wallet.publicKey} className="disabled" readOnly></Input>
              <Copy
                className="h-4 w-4 hover:scale-[1.01] transition-all ease-out duration-150 absolute right-5"
                onClick={() => handleCopy(wallet.publicKey, "Public address copied...")}
              ></Copy>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <label>Private Address: </label>
            <div className="flex items-center relative">
              <Input value={`••••••••••••••••••••••`} className="disabled" readOnly></Input>
              <Copy
                className="h-4 w-4 hover:scale-[1.01] transition-all ease-out duration-150 absolute right-5"
                onClick={() => handleCopy(wallet.privateKey, "Private address copied...")}
              ></Copy>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <DialogClose className="flex">
            <Button type="button" variant={"outline"} onClick={() => onRename(wallet.id, name)}>
              Save
            </Button>
          </DialogClose>

          {chainNetwork === "dev" ? (
            <Button onClick={handleAirdropRequest}>
              {requestAirdropStatus ? requestAirdropStatus : (requestAirdropLoading) ? "loading..." : "Request Airdrop"}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function TransactionDialog({ wallet, walletData }: TransactionDialogProps) {
  const [sendToAddress, setSendToAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);

  function handleMax() {
    setAmount(walletData.totalBalance);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1>From wallet: {wallet.name}</h1>
          <div>
            <Input value={wallet.address}></Input>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1>To</h1>
          <div>
            <Input value={sendToAddress} onChange={e => setSendToAddress(e.target.value)}></Input>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1>Amount</h1>
          <div className="relative">
            <Input value={amount} onChange={e => setAmount(Number(e.target.value))}></Input>
            <p className="absolute top-2 right-16">{wallet.chain.slice(0, 3).toUpperCase()}</p>
            <p
              className="absolute top-2 right-4 bg-transparent cursor-pointer transition-all duration-150 hover:brightness-125"
              onClick={handleMax}
            >
              MAX
            </p>
          </div>
          <p className="text-sm">Available: {walletData.totalBalance}</p>
        </div>

        <Button className="bg-[#B153D7] hover:bg-[#b767d6] hover:scale-[1.01] text-white mt-2">Send</Button>
      </div>
    </>
  );
}

export function WalletCard({ wallet, onRename, chainNetwork }: WalletCardProps) {
  const [copied, setCopied] = useState(false);

  const walletData = "mainNet" in wallet ? (chainNetwork === "main" ? wallet.mainNet : wallet.devNet) : undefined;

  return (
    <>
      <div className="bg-[#1D1F24] w-full h-content max-h-40 max-w-4xl rounded-xl p-5 flex flex-col">
        <Dialog>
          <div className="text-xl flex justify-between">
            <div className="flex items-center gap-3 ">
              <h2 className="">{wallet.name}</h2>

              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => {
                  handleCopy(wallet.publicKey, "Address copied");
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
                title="Copy address"
              >
                <span className="text-sm">
                  {wallet.publicKey.slice(0, 3)}...{wallet.publicKey.slice(-3)}
                </span>

                {!copied ? (
                  <Copy className="h-4 w-4 transition-all"></Copy>
                ) : (
                  <Check className="h-4 w-4 scale-110 transition-all"></Check>
                )}
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <DialogTrigger asChild>
                <img className="h-6 w-6 cursor-pointer" src="/setting.png"></img>
              </DialogTrigger>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#B153D7] hover:bg-[#b767d6] hover:scale-[1.01] text-white">Send</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-2">Transaction</DialogTitle>
                    <DialogDescription>
                      {walletData ? (
                        <TransactionDialog wallet={wallet} walletData={walletData} />
                      ) : (
                        <span className="inline-block h-6 w-24 bg-muted animate-pulse rounded" />
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div></div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Details</DialogTitle>
              <DialogDescription>
                <WalletEditForm wallet={wallet} onRename={onRename} chainNetwork={chainNetwork} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <h1 className="text-2xl mb-2">
          {walletData ? (
            `$${walletData.totalBalance.toFixed(2)}`
          ) : (
            <span className="inline-block h-6 w-24 bg-muted animate-pulse rounded" />
          )}
        </h1>

        <div className="flex gap-2 text-sm">
          {walletData?.tokens &&
            filterWalletTokenData(walletData).map((token, index) => (
              <span key={index}>
                {token.amount / 10 ** token.decimals} {token.symbol}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}
