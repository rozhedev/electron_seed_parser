import React, { FC, useState, useRef, useEffect } from "react";
import Btn from "../../ui/Btn/Btn";
import LogsGen from "../LogsGen/index";
import { TCheckIndicationProps } from "./types";
import { SEED_GEN_INTERVAL } from "../../data/init-data";
import { bip39, eng_str__consoleStatus } from "@renderer/data";

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
            <div className="count mb-4">
                <span className="text-grey-400">Checked:</span> <span className="font-semibold">{count}</span>
            </div>
            <code className="console">
                {!isRunning ? eng_str__consoleStatus.default : eng_str__consoleStatus.checking}

                {/* //* Render saved logs from LocalStorage */}
                {seedArr && seedArr.map((seed, index) => <span key={index}>wallet check: {seed}</span>)}
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
                        className="btn--primary-blue uppercase"
                        onClick={start}
                    >
                        Start
                    </Btn>
                ) : (
                    <Btn
                        type="button"
                        className="btn--primary-red uppercase"
                        onClick={stop}
                    >
                        STOP
                    </Btn>
                )}
                <Btn
                    className="ml-5 btn--gray btn--disabled uppercase"
                    onClick={reset}
                    disabled={count <= 0}
                >
                    RESET
                </Btn>
            </div>
        </>
    );
};
