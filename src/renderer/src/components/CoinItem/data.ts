import { ic_colored_bnb, ic_colored_btc, ic_colored_eth, ic_colored_ltc, ic_colored_sol, ic_colored_usdt } from "@renderer/data/icons";
import { v4 as uuid4 } from "uuid";
import { CoinSymbols } from "@renderer/data/constants";
import { TCoinItemData } from "./types";

export const AVAILABLE_CUR: TCoinItemData[]  = [
    {
        id: uuid4(),
        symbol: CoinSymbols.btc,
        icon: ic_colored_btc,
    },
    {
        id: uuid4(),
        symbol: CoinSymbols.eth,
        icon: ic_colored_eth,
    },
    {
        id: uuid4(),
        symbol: CoinSymbols.ltc,
        icon: ic_colored_ltc,
    },
    {
        id: uuid4(),
        symbol: CoinSymbols.usdt,
        icon: ic_colored_usdt,
    },
    {
        id: uuid4(),
        symbol: CoinSymbols.bnb,
        icon: ic_colored_bnb,
    },
    {
        id: uuid4(),
        symbol: CoinSymbols.sol,
        icon: ic_colored_sol,
    },
];

export const AVAILABLE_CUR_ICON = Object.values(AVAILABLE_CUR);
