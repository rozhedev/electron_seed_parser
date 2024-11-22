import React, { FC, useEffect, useState } from "react";
import Btn from "../../ui/Btn/Btn";
import { TSeedGateway } from "./types";
import { getCurrentDateFormat, getCurrentTimeFormat, randomIntNumByInterval } from "../../helpers";
import { eng_str__btn, eng_str__seedStatus, eng_str__ui } from "@renderer/data";
import { ic_repeat } from "@renderer/data/icons";
import { CoinSymbolsKeys, CryptoExchangersVal } from "@renderer/data/constants";

const genValidLog = (min: number, max: number): JSX.Element => {
    const coin = CoinSymbolsKeys[randomIntNumByInterval(0, CoinSymbolsKeys.length)];
    const exchanger = CryptoExchangersVal[randomIntNumByInterval(0, CryptoExchangersVal.length)];

    const balance = Math.random() * max + min;

    return (
        <span>
            usd/{coin} <span>{balance}</span> | {exchanger}
        </span>
    );
};

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className, tokenPass }) => {
    // * Rewrite sended seed logic
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [seedListLength, setSeedListLength] = useState<number>(0);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);

    useEffect(() => {
        window.api.onUpdateSeed((res) => {
            const seedList = res.payload._doc.sended_seed;
            setSeedListLength(seedList.length);

            if (seedList.length) setMessages(seedList);
            else setMessages([eng_str__seedStatus.notFound]);
        });
    }, [isLoading]);

    const handleUpdateBtnClick = () => {
        if (!tokenPass) return console.error("Password couldn't be parsed");

        window.api.updateSeed({ password: tokenPass });
        setIsLoading(true);

        setTimeout(() => {
            setUpdateDate(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);
            setIsLoading(false);
        }, 400);
    };

    return (
        <div>
            <div className="mt-5">
                <span className="text-gray-600">{eng_str__ui.lastChecked}</span>
                <span className="font-medium">{updateDate}</span>
            </div>
            <div className="mb-4">
                <span className="text-gray-600">{eng_str__ui.validSeedFinded}</span>
                <span className="font-medium">{seedListLength}</span>
            </div>
            <code className={className}>
                <span>{eng_str__ui.valitSeedAdresses}</span>
                {messages.map((msg: string, index: number) => (
                    // {genValidLog(10, 100)}
                    <span key={index}>{msg}</span>
                ))}
            </code>
            <Btn
                type="button"
                disabled={!isRunning}
                className={`btn ${isRunning ? "btn--gray" : "btn--disabled"}`}
                onClick={handleUpdateBtnClick}
            >
                <span className="pr-2">{isLoading ? eng_str__btn.updating : eng_str__btn.seedUpdate}</span>
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-transparent w-5"
                >
                    {ic_repeat}
                </svg>
            </Btn>
        </div>
    );
};
