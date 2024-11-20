import React, { FC, useEffect, useState } from "react";
import Btn from "../../ui/Btn/Btn";
import { TSeedGateway } from "./types";
import { getCurrentDateFormat, getCurrentTimeFormat } from "../../helpers";
import { eng_str__btn, eng_str__seedStatus, eng_str__ui } from "@renderer/data";

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className, tokenPass }) => {
    // * Rewrite sended seed logic
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);

    useEffect(() => {
        window.api.onUpdateSeed((res) => {
            const seedList = res.payload._doc.sended_seed;

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
            <div className="mt-9">{eng_str__ui.lastChecked} {updateDate}</div>
            <code className={className}>
                <span>{eng_str__ui.validSeedFinded}</span>
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
                {isLoading ? eng_str__btn.updating : eng_str__btn.seedUpdate}
            </Btn>
        </div>
    );
};
