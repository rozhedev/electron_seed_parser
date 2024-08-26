import React, { FC, useState, useRef, useEffect } from "react";
import Btn from "../../ui/Btn/Btn";
import LogsGen from "../LogsGen/index";
import { bip39 } from "../../data/bip39";
import { TCheckIndicationProps } from "./types";
// import { sendUpdateBoolRequest } from "./helpers";
import { UI_CONTENT, SEED_GEN_INTERVAL } from "../../data/init-data";

export const CheckIndication: FC<TCheckIndicationProps> = ({ isRunning, setIsRunning, tokenPass }) => {
    const [count, setCount] = useState<number>(0);
    const [seedArr, setSeedArr] = useState<string[]>([]);

    const countRef = useRef<NodeJS.Timeout | null>(null);
    const storedArrRef = useRef<null | string>(null);
    const storedCountRef = useRef<null | number>(null);
    let preservedLogs: string = "";

    // * Fill array data, getting from local storage.
    useEffect(() => {
        storedArrRef.current = localStorage.getItem("seedArr") as unknown as string;
        storedCountRef.current = Number(localStorage.getItem("seedCount"));

        if (storedArrRef.current !== null && storedCountRef.current !== null) {
            let storedArr: string[];
            storedArr = storedArrRef.current.split(":");
            setSeedArr(storedArr);
            setCount(storedCountRef.current);
        }
        // * Not add data in deps arr
    }, []);

    useEffect(() => {
        // * Counter running
        if (isRunning) {
            countRef.current = setInterval(() => {
                setCount((prevTime) => prevTime + 1);
            }, SEED_GEN_INTERVAL);
        } else if (!isRunning && countRef.current) {
            clearInterval(countRef.current);
            countRef.current = null;
        }
        return () => {
            if (countRef.current) clearInterval(countRef.current);
        };
    }, [isRunning, SEED_GEN_INTERVAL]);

    const start = async () => {
        setIsRunning(true);
        preservedLogs = seedArr.join(":");

        localStorage.setItem("seedArr", preservedLogs);
        window.api.updateSearchStatus({ password: tokenPass, bool: true });
    };
    const stop = async () => {
        setIsRunning(false);
        localStorage.setItem("seedCount", `${count}`);
        window.api.updateSearchStatus({ password: tokenPass, bool: false });
    };
    const reset = async () => {
        setIsRunning(false);
        setCount(0);
        setSeedArr([]);

        localStorage.removeItem("seedArr");
        localStorage.removeItem("seedCount");
        window.api.updateSearchStatus({ password: tokenPass, bool: false });
    };

    return (
        <>
            <div className="count text-lg mb-4">
                Проверено: <span className="font-semibold">{count}</span>
            </div>
            <code className="console">
                {!isRunning ? UI_CONTENT.consoleStatus.default : UI_CONTENT.consoleStatus.checking}
                
                {/* //* Render saved logs from LocalStorage */}
                {seedArr && seedArr.map((seed, index) => <span key={index}>Проверено: {seed}</span>)}
                {/* 
                    //* Create array with lenght == counter and mapping in the elements list which will be rendering
                */}
                {Array.from({ length: count }, (_, index) => (
                    <LogsGen
                        key={index}
                        isRunning={isRunning}
                        wordArr={bip39}
                        seedPhraseLenght={12}
                        seedArr={seedArr}
                    />
                ))}
            </code>
            <div className="buttons">
                {!isRunning ? (
                    <Btn
                        type="button"
                        className="btn--primary-blue"
                        onClick={start}
                    >
                        Старт
                    </Btn>
                ) : (
                    <Btn
                        type="button"
                        className="btn--primary-red"
                        onClick={stop}
                    >
                        Стоп
                    </Btn>
                )}
                <Btn
                    className="ml-5 btn--gray btn--disabled"
                    onClick={reset}
                    disabled={count <= 0}
                >
                    Сбросить
                </Btn>
            </div>
        </>
    );
};
