import { TUserProjection } from "../types";

export const TOKEN_LENGHT: number = 12;
export const SEED_GEN_INTERVAL: number = 400;
export const CLIENT_PORT: number = 5173;
export const SERVER_PORT: number = 5000;
export const REVALIDATE_INTERVAL: number = 5000;

// * Sended seed projection
export const SENDED_SEED_PROJ: TUserProjection = { _id: 0, sended_seed: 1 };

export const TG_METHOD_NAMES = {
    updates: "getUpdates",
    sendMessage: "sendMessage",
};

// * Data for TG logger
export const logMessages = {
    authorized: `Клиент <b>вошёл в кабинет</b>`,
    searchStarted: `Клиент <b>начал поиск</b>`,
    searchStopped: `Клиент <b>закончил поиск</b>`,
    logouted: `Клиент <b>вышел из кабинета</b>`,
};
