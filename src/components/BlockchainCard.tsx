import { type blockchainCard } from "@/types/types";

export default function BlockchainCard({ imageSrc, blockchainName, selectedChain, setSelectedChain }: blockchainCard) {
  const isActive = selectedChain === blockchainName;

  return (
    <>
      <div className="h-14 bg-[#26282E] rounded-xl p-4 cursor-pointer hover:bg-[#2F3239] hover:scale-[1.01] active:scale-[0.97] transition-all duration-150 ease-out" onClick={() => setSelectedChain(blockchainName)}>
        <div className="flex gap-3 h-full items-center">
          <div className="">
            <img src={imageSrc} className="w-8 h-8 object-contain rounded-lg" alt="" />
          </div>

          <div>
            <p className="text-xl">{blockchainName}</p>
          </div>

          {isActive ? (
            <div className="ms-auto">
              <img src="./tick.png" alt="" className="w-6 h-6" />
            </div>
          ) : (
            ""
          )}
          
        </div>
      </div>
    </>
  );
}
