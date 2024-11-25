import React, { FC, useEffect, useState } from "react";
import { IndicatorBtn } from "@renderer/ui";
import { TSeedGateway } from "./types";
import { getCurrentDateFormat, getCurrentTimeFormat } from "@renderer/helpers";
import { eng_str__btn, eng_str__seedStatus, eng_str__ui } from "@renderer/data";
import { ic_repeat } from "@renderer/data/icons";

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className, tokenPass }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [seedListLength, setSeedListLength] = useState<number>(0);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);

    const handleUpdateSeed = (res: any) => {
        const seedList = res.payload._doc.sended_seed;
        setSeedListLength(seedList.length);

        if (seedList.length) setMessages(seedList);
        else setMessages([eng_str__seedStatus.notFound]);
    };

    useEffect(() => {
        window.api.removeListener("on-update-seed", handleUpdateSeed as () => void);
        window.api.onUpdateSeed(handleUpdateSeed);

        return () => {
            window.api.removeListener("on-update-seed", handleUpdateSeed as () => void);
        };
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

    // --> -----------------------------
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
                <span className="text-gray-600 font-medium">{eng_str__ui.valitSeedAdresses}</span>
                {messages.map((msg: string, index: number) => (
                    <div
                        key={index}
                        className="mb-2 font-medium"
                    >
                        {msg}
                    </div>
                ))}
            </code>
            <IndicatorBtn
                btnClass={isRunning ? "btn--gray" : "btn--disabled"}
                icon={ic_repeat}
                label={isLoading ? eng_str__btn.updating : eng_str__btn.seedUpdate}
                disabled={!isRunning}
                onClick={handleUpdateBtnClick}
            />
        </div>
    );
};
