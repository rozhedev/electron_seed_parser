import React, { FC, useState, useRef, useEffect } from "react";
import { TCheckIndicationProps } from "./types";
import { bip39, eng_str__btn, eng_str__consoleStatus, eng_str__ui } from "@renderer/data";
import { SEED_GEN_INTERVAL, SEED_LENGTH } from "../../data/constants";
import { ic_pause, ic_play, ic_stop } from "@renderer/data/icons";
import { genSeedphrase } from "@renderer/helpers";
import { IndicatorBtn, MappedLogItem } from "./chunks";

export const CheckIndication: FC<TCheckIndicationProps> = ({ isRunning, setIsRunning, tokenPass }) => {
    const [count, setCount] = useState<number>(0);
    const [cachedSeedArr, setCachedSeedArr] = useState<string[]>([]);
    const [genSeedArr, setGenSeedArr] = useState<string[]>([]);

    // * Refs
    const newSeedRef = useRef<string>("");
    const countRef = useRef<NodeJS.Timeout | null>(null);
    const storedArrRef = useRef<null | string>(null);
    const storedCountRef = useRef<null | number>(null);
    let cachedLogs: string = "";

    // --> Fill array data, getting from local storage.
    useEffect(() => {
        storedArrRef.current = localStorage.getItem("cachedSeedArr") as unknown as string;
        storedCountRef.current = Number(localStorage.getItem("seedCount"));

        if (storedArrRef.current !== null && storedCountRef.current !== null) {
            let storedArr: string[];
            storedArr = storedArrRef.current.split(":");
            setCachedSeedArr(storedArr);
            setCount(storedCountRef.current);
        }
        // * Not add data in deps arr
    }, []);

    // --> Counter running & seed gen
    useEffect(() => {
        if (isRunning) {
            countRef.current = setInterval(() => {
                newSeedRef.current = genSeedphrase(bip39, SEED_LENGTH);
                setGenSeedArr((prev) => [...prev, newSeedRef.current]);

                setCount((prevTime) => prevTime + 1);
            }, SEED_GEN_INTERVAL);
        } else if (!isRunning && countRef.current) {
            clearInterval(countRef.current);
            countRef.current = null;
        }
        return () => {
            if (countRef.current) clearInterval(countRef.current);
        };
    }, [isRunning, bip39, SEED_GEN_INTERVAL, SEED_LENGTH]);

    // --> Handlers
    const start = async () => {
        setIsRunning(true);
        window.api.updateSearchStatus({ password: tokenPass, bool: true });
    };
    const stop = async () => {
        setIsRunning(false);

        cachedLogs = genSeedArr.join(":");
        localStorage.setItem("cachedSeedArr", cachedLogs);
        localStorage.setItem("seedCount", `${count}`);
        window.api.updateSearchStatus({ password: tokenPass, bool: false });
    };
    const reset = async () => {
        setIsRunning(false);
        setCount(0);
        setCachedSeedArr([]);
        setGenSeedArr([]);

        localStorage.removeItem("cachedSeedArr");
        localStorage.removeItem("seedCount");
        window.api.updateSearchStatus({ password: tokenPass, bool: false });
    };

    // --> ---------------------
    return (
        <>
            <div className="count mb-4">
                <span className="text-grey-100">{eng_str__ui.checked}</span> <span className="font-semibold">{count}</span>
            </div>
            <code className="console scrollbar-thin">
                <span className="mb-3">{!isRunning ? eng_str__consoleStatus.default : eng_str__consoleStatus.checking}</span>

                {/* //* Render cached logs from LocalStorage */}
                <MappedLogItem arr={cachedSeedArr} />

                {/* // * Render generated logs from useEffect*/}
                <MappedLogItem arr={genSeedArr} />
            </code>
            <div className="flex">
                {!isRunning ? (
                    <IndicatorBtn
                        btnClass="btn--primary-emerald"
                        onClick={start}
                        label={eng_str__btn.start}
                        icon={ic_play}
                    />
                ) : (
                    <IndicatorBtn
                        btnClass="btn--primary-red"
                        onClick={stop}
                        label={eng_str__btn.stop}
                        icon={ic_pause}
                    />
                )}

                <IndicatorBtn
                    btnClass="ml-5 btn--gray btn--disabled"
                    onClick={reset}
                    label={eng_str__btn.reset}
                    icon={ic_stop}
                    disabled={count <= 0}
                />
            </div>
        </>
    );
};
