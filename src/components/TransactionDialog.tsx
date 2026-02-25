import type { TransactionDialogProps, transactionStatus } from "@/types/types";
import { useState } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionStatusView } from "./TransactionStatusView";

import { sendTransaction } from "@/lib/solana";
import { validateInput } from "@/lib/utils";
import { sendEthTransaction } from "@/lib/ethereum";

export function TransactionDialog({ wallet, walletData, chainNetwork, fetchBalance, chain}: TransactionDialogProps) {
  const [sendToAddress, setSendToAddress] = useState("");
  const [amount, setAmount] = useState<number | ''>('');
  const [status, setStatus] = useState<transactionStatus>("idle");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null)


  function handleMax() {
    setAmount(walletData.balance);
  }

  function mapErrorToMessage(error: unknown): string {
    if (error instanceof Error) {
      // minimal pattern matching ONLY if you care
      if (error.message.includes("Invalid public key")) {
        return "Invalid recipient address.";
      }

      if (error.message.includes("lamports")) {
        return "Insufficient balance.";
      }
    }

    return "Transaction failed. Please try again.";
  }

  async function handleSend() {
    // reset previous error
    setFormError(null);

    try {
      validateInput(sendToAddress, amount);
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Invalid input.");
      }
      return; // ⛔ stop here — do NOT send tx
    }

    try {
      setStatus("loading");

      const sig = (chain === "Solana") ? await sendTransaction(wallet, chainNetwork, sendToAddress, amount): await sendEthTransaction(wallet, chainNetwork, sendToAddress, amount, );

      setMessage("Transaction Successful: " + sig);
      setStatus("success");

      fetchBalance();
    } catch (error) {
      console.error(error);

      setMessage(mapErrorToMessage(error));
      setStatus("error");
    }
  }

  if (status != "idle") return <TransactionStatusView status={status} message={message} />;

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
      formError={formError}
    />
  );
}

