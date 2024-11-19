import { TG_METHOD_NAMES } from "../data/init-data";

// --> Generation seedphrase
export const getRandomWord = (wordArr: string[]): string => wordArr[Math.floor(Math.random() * wordArr.length)];

export const genSeedphrase = (wordArr: string[], seedPhraseLenght: number): string => {
    const seedArr: string[] = [];
    let randomWord: string = "";

    for (let i: number = 0; i < seedPhraseLenght; i++) {
        randomWord = getRandomWord(wordArr);

        // * If current word match with previous, generate word again
        if (i > 0 && randomWord === seedArr[i - 1]) randomWord = getRandomWord(wordArr);
        seedArr.push(randomWord);
    }

    // * Create string from array and set value
    const newSeedPhrase = seedArr.join(" ");
    return newSeedPhrase;
};

// --> Logger to Telegram
export const getBotBaseUrl = (token: string, methodName: string): string => `https://api.telegram.org/bot${token}/${methodName}`;

export const sendLog = async (token: string, chatId: string, log: string): Promise<void> => {
    const url: string = `${getBotBaseUrl(token, TG_METHOD_NAMES.sendMessage)}?chat_id=${chatId}&parse_mode=HTML&text=${log}`;
    const res: Response = await fetch(url);

    if (!res.ok) {
        const error = await res.json();
        await Promise.reject(error.description || "Invalid url data (API link or chat ID, or headers values)");
    }
};

// --> Get current Date & Time
const formatted = (value: number) => (value < 10 ? `0${value}` : `${value}`);

export const getCurrentDateFormat = (): string => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${formatted(day)}.${formatted(month)}.${year}`;
};

export const getCurrentTimeFormat = (): string => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatted(hours)}:${formatted(minutes)}`;
};

export const getHostname = (protocol: string, port: number, route?: string) => `${protocol}://localhost:${port}/${route}`;
