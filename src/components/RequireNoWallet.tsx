import { hasSeedPhrase } from "@/lib/utils";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";


export function RequireNoWallet({children}: {children: JSX.Element}) { 
    if (hasSeedPhrase()) { 
        return <Navigate to={"/dashboard"} replace></Navigate>
    }

    return children
}