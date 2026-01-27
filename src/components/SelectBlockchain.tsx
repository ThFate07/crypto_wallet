import { useState } from "react";
import BlockchainCard from "./BlockchainCard";
import { Button } from "./ui/button";
import { type blockchain } from "@/types/types";

export default function SelectBlockchain() {
  const [selectedChain, setSelectedChain] = useState<blockchain>("Solana");

  return (
    <>
      <div className="bg-[#1D1F24] h-96 w-96 rounded-2xl">
        <div className="flex flex-col p-5 gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-xl ">Select your Blockchain</h3>
            </div>
            <div>
              <p className="text-sm text-[#8d91a4]">Choose the network for your wallet</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <BlockchainCard
              imageSrc="./solana.png"
              blockchainName="Solana"
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
            <BlockchainCard
              imageSrc="./eth.png"
              blockchainName="Ethereum"
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
            <BlockchainCard
              imageSrc="./bitcoin.png"
              blockchainName="Bitcoin"
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
          </div>

          <div className="my-2">
            <Button variant={"secondary"} className="bg-[#184391] w-full hover:bg-[#1F54B3] transition-all duration-150 ease-out hover: scale-[1.01] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
