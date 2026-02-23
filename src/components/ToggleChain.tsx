import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ToggleChainProps } from "@/types/types";


export function ToggleChain({chain, setChain}: ToggleChainProps) { 
    return ( 
        <>
        <div>
            <ToggleGroup type="single" defaultValue={chain}>
              <ToggleGroupItem value="Solana" onClick={() => setChain("Solana")}>
                Solana
              </ToggleGroupItem>
              <ToggleGroupItem value="Ethereum" onClick={() => setChain("Ethereum")}>
                Ethereum
              </ToggleGroupItem>
              {/* <ToggleGroupItem value="Bitcoin" onClick={() => setChain("Bitcoin")}>
              Bitcoin
                </ToggleGroupItem> */}
            </ToggleGroup>
          </div>
        </>
    )
}