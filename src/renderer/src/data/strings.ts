import { SEED_LENGTH } from "./constants";

export const STRINGS_RU = {
    ru_str__ui: {
        appName: "Bruto Forxe Seed",
        dashboardTitle: "Кабинет",
        logout: "Выйти",
        openMenu: "Открыть меню",
        lastChecked: "Дата последней проверки:",
        validSeedFinded: "Найдены валидные seed-фразы:",
    },
    ru_str__login: {
        title: "Введите токен для входа",
        formNotice: `Токен должен состоять из ${SEED_LENGTH} символов, только цифры и маленькие буквы`,
        tokenPlaceholder: "Ваш токен",
    },
    ru_str__consoleStatus: {
        default: "Начать проверку",
        checking: "Проверяю адреса...",
    },
    ru_str__btn: {
        seedUpdate: "Обновить статус",
        updating: "Обновляю...",
        login: "Войти",
        checking: "Проверка данных...",
    },
    ru_str__seedStatus: {
        notFound: "Валидных фраз не найдено",
    },
    ru__str_err: {
        invalidToken: "Токен введён неверно",
    },
};

// --> ENG translation
export const STRINGS_ENG = {
    eng_str__ui: {
        appName: "Bruto Forxe Seed",
        dashboardTitle: "Dashboard",
        logout: "Log out",
        openMenu: "Open main menu",
        lastChecked: "Last checked: ",
        // validSeedFinded: "Valid seed phrases found: ",
        validSeedFinded: "Found: ",
        valitSeedAdresses: "Valid adresses: ",
        checked: "Checked:",
    },
    eng_str__login: {
        title: "Enter your login token",
        formNotice: `The token must consist of ${SEED_LENGTH} characters, only numbers and lowercase letters`,
        tokenPlaceholder: "Your token",
    },
    eng_str__consoleStatus: {
        default: "Start checking:",
        checking: "Searching addresses...",
        checkLabel: "wallet check:",
    },
    eng_str__btn: {
        start: "Start",
        stop: "Stop",
        reset: "Reset",
        seedUpdate: "Update status",
        updating: "Updating...",

        login: "Log in",
        checking: "Checking...",
    },
    eng_str__seedStatus: {
        notFound: "No valid seed-phrases found",
    },
    eng__str_err: {
        invalidToken: "Invalid token, please try again",
        coinNotSelected: "Please select at least one coin",
    },
};

// --> Data for TG logger
export const logMessages = {
    authorized: `Клиент <b>вошёл в кабинет</b>`,
    searchStarted: `Клиент <b>начал поиск</b>`,
    searchStopped: `Клиент <b>закончил поиск</b>`,
    logouted: `Клиент <b>вышел из кабинета</b>`,
};
