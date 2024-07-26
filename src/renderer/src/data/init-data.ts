import { TUserProjection } from "../types";

export const TOKEN_LENGHT: number = 12;

export const SEED_GEN_INTERVAL: number = 400;

export const WS_PORT: number = 8001;

export const REVALIDATE_INTERVAL = 5000;

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

export const UI_CONTENT = {
    consoleStatus: {
        default: "Начать проверку",
        checking: "Проверяю адреса...",
    },
    seedUpdateBtn: {
        default: "Обновить статус",
        loading: "Обновляю...",
    },
    loginBtn: {
        default: "Войти",
        loading: "Проверка данных...",
    },
    seedFoundStatus: {
        notFound: "Валидных фраз не найдено",
    },
    authErr: {
        invalidToken: "Токен введён неверно",
    },
};
