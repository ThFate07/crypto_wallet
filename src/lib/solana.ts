import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";

const heliusAPI = import.meta.env.VITE_HELIUS_API;
const main = new Connection(`https://mainnet.helius-rpc.com/?api-key=${heliusAPI}`, "confirmed");
const dev = new Connection("https://api.devnet.solana.com", "confirmed");
export const solanaConnections = {
  main,
  dev,
};
const API_KEYS =  { 
    main: import.meta.env.VITE_HELIUS_API,
    dev: import.meta.env.VITE_DEV_HELIUS_API
}

export const getAccountInfo = async (publicKey: string, connectionType: "main" | "dev") => {
  const address = new PublicKey(publicKey);
  const accountInfo = await solanaConnections[connectionType].getAccountInfo(address);
  return accountInfo;
};

export const getBalance = async (wallet: string, connectionType: "main" | "dev") => {
  const api_key = API_KEYS[connectionType]
  const res = await fetch(
    `https://api.helius.xyz/v0/addresses/${wallet}/balances?api-key=${api_key}`,
  );

  if (!res) throw new Error("failed to fetch balance");
  
  const data = await res.json();
  return data
};

export async function getPrices(mintAddress) { 
  const ids = mintAddress.join(',');
  const url = "https://api.coingecko.com/api/v3/simple/token_price/solana";

  const response = await axios.get(url, {
    params: { 
      contract_addresses: ids,
      vs_currencies: "usd"
    }
  })

  return response.data;
}