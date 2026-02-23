import type { TransactionFormProps } from "@/types/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function TransactionForm({
  wallet,
  sendToAddress,
  setSendToAddress,
  amount,
  setAmount,
  handleMax,
  walletData,
  handleSend,
}: TransactionFormProps) {
  return (
    <>
      <div className="flex flex-col gap-3 min-h-72">
        <div className="flex flex-col gap-2">
          <h1>From wallet: {wallet.name}</h1>
          <div>
            <Input value={wallet.address} readOnly></Input>
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
          <p className="text-sm">Available: {walletData.balance}</p>
        </div>

        <Button className="bg-[#B153D7] hover:bg-[#b767d6] hover:scale-[1.01] text-white mt-2" onClick={handleSend}>
          Send
        </Button>
      </div>
    </>
  );
}
