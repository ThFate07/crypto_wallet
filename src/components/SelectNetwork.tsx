import type { SelectNetworkProps } from "@/types/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function SelectNetwork({chainNetwork, setChainNetwork}: SelectNetworkProps) { 

    return ( 
        <div>
            <Select value={chainNetwork} onValueChange={v => setChainNetwork(v as "main" | "dev")}>
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="main">Main Net</SelectItem>
                  <SelectItem value="dev">Dev net</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
    )
}