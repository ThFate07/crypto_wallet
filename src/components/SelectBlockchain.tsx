import BlockchainCard from "./BlockchainCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";

export default function SelectBlockchain() {
  const { chain, setChain } = useWallet();

  return (
    <>
      <div className="bg-[#1D1F24] h-96 w-96 rounded-2xl my-36">
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
              imageSrc="/solana.png"
              blockchainName="Solana"
              selectedChain={chain}
              setSelectedChain={setChain}
            />
            <BlockchainCard
              imageSrc="/eth.png"
              blockchainName="Ethereum"
              selectedChain={chain}
              setSelectedChain={setChain}
            />
            <BlockchainCard
              imageSrc="/bitcoin.png"
              blockchainName="Bitcoin"
              selectedChain={chain}
              setSelectedChain={setChain}
            />
          </div>

          <div className="my-2">
            <Link to={'/onboarding/seed-phrase'}>
              <Button
                variant={"secondary"}
                className="bg-[#184391] w-full hover:bg-[#1F54B3] transition-all duration-150 ease-out hover: scale-[1.01] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
