export type TCoinItem = {
    checked: boolean;
    onChange: () => void;
    icon: React.ReactElement;
};

export enum CoinSymbols {
    btc = "btc",
    eth = "eth",
    ltc = "ltc",
    usdt = "usdt",
    bnb = "bnb",
    sol = "sol",
}

export type CoinSymbolsUnion = `${CoinSymbols}`;

export type TCoinItemData = {
    id: string;
    symbol: CoinSymbolsUnion;
    icon: React.JSX.Element;
}

