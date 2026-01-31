import { toast } from "sonner";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Copy, Check } from "lucide-react";
import { handleCopy } from "@/lib/utils";
import { useState } from "react";
import type { WalletCardProps } from "@/types/types";

export function WalletCard(wallet: WalletCardProps) {
  const [copied, setCopied] = useState(false);
  
  return (
    <>
      <div className="bg-[#1D1F24] w-full h-content max-h-40 max-w-4xl rounded-xl p-5 flex flex-col gap-2">
        <Dialog>
          <div className="text-xl flex justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2>{wallet.name}</h2>
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => {
                    handleCopy(wallet.publicKey, "Address copied");
                    setCopied(true)
                    setTimeout(() => {
                      setCopied(false)
                    }, 1000);
                  }}
                  title="Copy address"
                >
                  <span className="text-sm">
                    {wallet.publicKey.slice(0, 3)}...{wallet.publicKey.slice(-3)}
                  </span>

                  { !copied ? <Copy className="h-4 w-4 transition-all"></Copy> : <Check className="h-4 w-4 scale-110 transition-all"></Check> } 
                </div>
              </div>
              <h1 className="text-2xl">$153.2</h1>
            </div>

            <div className="flex gap-3 items-center">
              <DialogTrigger asChild>
                <img className="h-6 w-6 cursor-pointer" src="/setting.png"></img>
              </DialogTrigger>
              <Button className="bg-[#B153D7] hover:bg-[#b767d6] hover:scale-[1.01] text-white">Send</Button>
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Details</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label>Edit wallet name</label>
                    <Input value="Main Wallet"></Input>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <label>Public Address: </label>
                      <div className="flex items-center relative">
                        <Input
                          value={wallet.publicKey}
                          className="disabled"
                        ></Input>
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
                        <Input value={`••••••••••••••••••••••`} className="disabled"></Input>
                        <Copy
                          className="h-4 w-4 hover:scale-[1.01] transition-all ease-out duration-150 absolute right-5"
                          onClick={() => handleCopy(wallet.privateKey, "Private address copied...")}
                        ></Copy>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2 text-sm">
          <h2>1.02 Sol</h2>
          <h2>. 132 USDT</h2>
        </div>
      </div>
    </>
  );
}
