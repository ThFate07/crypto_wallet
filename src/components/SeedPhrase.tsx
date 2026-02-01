import { useWallet } from "@/context/WalletContext";
import { generateWallet } from "@/lib/utils";
import {  useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-500"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default function SeedPhrase() {
  const { chain } = useWallet();
  const [mnemonic ] = useState(() => {
    const { mnemonic } = generateWallet(chain, 0);
    return mnemonic.split(" ");
  });
  const navigate = useNavigate();

  const copyToClipboard = () => { 
   navigator.clipboard.writeText(mnemonic.join(" "));
   toast("Mnemonic copied...", { position: "bottom-right" })
   navigate('/dashboard')
  }

  return (
    <>
      <div className="bg-[#1D1F24] w-full max-w-3xl h-full max-h-160 p-7 rounded-xl">
        {/* heading */}
        <div className="flex flex-col justify-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Secret Recovery Phrase</h2>

          <div className="bg-yellow-500/10 h-full max-h-20 rounded-sm p-4">
            <div className="flex items-center content-center gap-4">
              <div>{WarningIcon()}</div>

              <div>
                <p>
                  <span className="font-bold">Warning: </span> Never share this phrase. if you share your recovery
                  phrase your wallet cannot be recovered.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* mnemonic */}
        <div className="grid grid-cols-3 place-items-center h-full max-h-90 mb-6">
          {mnemonic.map((keyword) => (
            <div className="flex flex-row justify-center gap-5 border-2 rounded-3xl p-5 w-full max-w-42">
              <div className="">{keyword}</div>
            </div>
          ))}
        </div>

        {/* button  */}

        <div>
          <Button className="w-full bg-[#4e5ff3] hover:bg-[#919cfa] hover:scale-[1.01] transition-all ease-out duration-150 active:scale-[0.97]" onClick={copyToClipboard}>
            <div className="h-6 w-6">
              <img src="https://img.icons8.com/?size=100&id=38591&format=png&color=000000"></img>
            </div>
            Copy to clipboard
          </Button>
        </div>
      </div>
    </>
  );
}
