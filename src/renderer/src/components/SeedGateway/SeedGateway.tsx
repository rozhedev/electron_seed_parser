import React, { FC, useEffect, useState } from "react";
import Btn from "../../ui/Btn/Btn";
import { TSeedGateway } from "./types";
import { getCurrentDateFormat, getCurrentTimeFormat } from "../../helpers";
import { UI_CONTENT } from "../../data/init-data";

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className, tokenPass }) => {
    // * Rewrite sended seed logic
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);

    useEffect(() => {
        window.api.getSeedList((res) => {
            const seedList = res.payload._doc.sended_seed;  
            console.log(seedList);
                    
            if (seedList.length) setMessages(seedList);
            else setMessages([UI_CONTENT.seedFoundStatus.notFound]);            
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
                onClick={handleUpdateBtnClick}
            >
                {isLoading ? UI_CONTENT.seedUpdateBtn.loading : UI_CONTENT.seedUpdateBtn.default}
            </Btn>
        </div>
    );
};
