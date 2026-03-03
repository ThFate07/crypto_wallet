import type { transactionStatus } from "@/types/types";
import { Spinner } from "./ui/spinner";

export function TransactionStatusView({
  status,
  message,
  chainNetwork,
}: {
  status: transactionStatus;
  message: string;
  chainNetwork: "main" | "dev";
}) {
  return (
    <>
      <div className="flex flex-1 justify-center items-center min-h-72">
        {status === "loading" ? (
          <Spinner className="size-40" />
        ) : status === "success" ? (
          <div className="flex flex-col justify-center items-center gap-8 flex-wrap">
            <img src="checkmark.png" className="size-40"></img>
            <a className="underline cursor-pointer" href={`https://explorer.solana.com/tx/${message}` + (chainNetwork === "dev" ? "?cluster=devnet" : '')} target="_blank" rel="noopener noreferrer">
              View Transaction
            </a>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-8">
            <img src="failed.png" className="size-40"></img>
            <h1 className="text-red-600">{message}</h1>
          </div>
        )}
      </div>
    </>
  );
}
