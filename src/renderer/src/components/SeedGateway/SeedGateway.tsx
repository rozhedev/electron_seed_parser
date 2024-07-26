import { FC, useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import Btn from "../../ui/Btn/Btn";
import { TSeedGateway } from "./types";
import { getSendedSeed } from "./helpers";
import { getCurrentDateFormat, getCurrentTimeFormat } from "../../helpers";
import { UI_CONTENT, SENDED_SEED_PROJ } from "../../data/init-data";

export const SeedGateway: FC<TSeedGateway> = ({ isRunning, messages, setMessages, className }) => {
    // const { data: session } = useSession();
    // let tokenName = session?.user?.name as string;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateDate, setUpdateDate] = useState<string>(`${getCurrentTimeFormat()} | ${getCurrentDateFormat()}`);

    // useEffect(() => {
    //     if (tokenName) getSendedSeed(tokenName, SENDED_SEED_PROJ, setMessages);
    //     // * Not add serMessages in deps array
    // }, [tokenName]);

    return (
        <div>
            <div className="mt-9">Дата последней проверки: {updateDate}</div>
            <code className={className}>
                <span>Найдена валидная seed-фраза:</span>
                {messages.map((msg, index) => (
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
