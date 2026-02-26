import { hasSeedPhrase } from "@/lib/utils";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";


export function RequireWallet({children}: {children: JSX.Element}) { 
    if (!hasSeedPhrase()) { 
        return <Navigate to={"/onboarding/select-chain"} replace></Navigate>
    }

    return children
}