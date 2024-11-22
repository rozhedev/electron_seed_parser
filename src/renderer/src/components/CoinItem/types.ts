import { CoinSymbolsUnion } from "@renderer/data/constants";

export type TCoinItem = {
    checked: boolean;
    onChange: () => void;
    icon: React.ReactElement;
};

export type TCoinItemData = {
    id: string;
    symbol: CoinSymbolsUnion;
    icon: React.JSX.Element;
};
