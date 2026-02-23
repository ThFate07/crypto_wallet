import type { transactionStatus } from "@/types/types";
import { Spinner } from "./ui/spinner";

export function TransactionStatusView({ status }: { status: transactionStatus }) {
  return (
    <>
      <div className="flex flex-1 justify-center items-center">
        {status === "Loading" ? (
          <Spinner className="size-40" />
        ) : status === "Success" ? (
          <img src="checkmark.png" className="size-40"></img>
        ) : (
          <img>Failed</img>
        )}
      </div>
    </>
  );
}
