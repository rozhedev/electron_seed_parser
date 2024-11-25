import { TUserProjection } from "../types";

export const SEED_LENGTH = 12;
export const TOKEN_LENGHT = 12;
export const SEED_GEN_INTERVAL = 400;
export const CLIENT_PORT = 5173;
export const SERVER_PORT = 5000;
export const REVALIDATE_INTERVAL = 5000;

// * Sended seed projection
export const SENDED_SEED_PROJ: TUserProjection = { _id: 0, sended_seed: 1 };

export const TG_METHOD_NAMES = {
    updates: "getUpdates",
    sendMessage: "sendMessage",
};

// * Available coins
export enum CoinSymbols {
    btc = "btc",
    eth = "eth",
    ltc = "ltc",
    usdt = "usdt",
    bnb = "bnb",
    sol = "sol",
}
export type CoinSymbolsUnion = `${CoinSymbols}`;
export const CoinSymbolsKeys: string[] = Object.keys(CoinSymbols);
