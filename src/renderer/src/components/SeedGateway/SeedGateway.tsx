import React, { FC, useEffect, useState } from "react";
import Btn from "../../ui/Btn/Btn";
import { TSeedGateway } from "./types";
import { getSendedSeed } from "./helpers";
import { getCurrentDateFormat, getCurrentTimeFormat } from "../../helpers";
import { SENDED_SEED_PROJ, UI_CONTENT } from "../../data/init-data";
import { useAuthContext } from "@renderer/providers/AuthContext";

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className }) => {
    // * Rewrite sended seed logic
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);
    const { data } = useAuthContext();

    useEffect(() => {
        if (data?.password) {
            // getSendedSeed(data.password, SENDED_SEED_PROJ, setMessages);
            console.log(data);
        }
    }, [data]);

    return (
        <div>
            <div>Name: {data?.password}</div>
            <div className="mt-9">Дата последней проверки: {updateDate}</div>
            <code className={className}>
                <span>Найдена валидная seed-фраза:</span>
                {messages.map((msg: any, index: number) => (
                    <span key={index}>{msg}</span>
                ))}
            </code>
            <Btn
                type="button"
                disabled={!isRunning}
                className={`btn ${isRunning ? "btn--primary-blue" : "btn--disabled"}`}
                onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                        setUpdateDate(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);
                        // getSendedSeed(tokenName, SENDED_SEED_PROJ, setMessages);
                        setIsLoading(false);
                    }, 400);
                }}
            >
                {isLoading ? UI_CONTENT.seedUpdateBtn.loading : UI_CONTENT.seedUpdateBtn.default}
            </Btn>
        </div>
    );
};
