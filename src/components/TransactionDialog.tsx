import type { TransactionDialogProps, transactionStatus } from "@/types/types";
import { useState } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionStatusView } from "./TransactionStatusView";

export function TransactionDialog({ wallet, walletData }: TransactionDialogProps) {
  const [sendToAddress, setSendToAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<transactionStatus>("idle");

  function handleMax() {
    setAmount(walletData.balance);
  }

  function handleSend() {
    setStatus("Loading");
    setTimeout(() => {
      setStatus("Success");
      setTimeout(() => {
        setStatus("idle");
      }, 2 * 1000);
    }, 3 * 1000);
  }

  if (status != "idle") return <TransactionStatusView status={status} />;

  return (
    <TransactionForm
      wallet={wallet}
      sendToAddress={sendToAddress}
      setSendToAddress={setSendToAddress}
      amount={amount}
      setAmount={setAmount}
      handleMax={handleMax}
      walletData={walletData}
      handleSend={handleSend}
    />
  );
}
