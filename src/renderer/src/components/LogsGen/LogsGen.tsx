import React, { FC, useEffect, useRef, useState } from "react";
import { TLogsGenProps } from "./types";
import { genSeedphrase } from "../../helpers";
import { eng_str__consoleStatus } from "@renderer/data";

export const LogsGen: FC<TLogsGenProps> = ({ wordArr, seedPhraseLenght, isRunning }) => {
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const newSeed: any = useRef<string>("");

    // * Necessary useEffect using for prevent too many rerenders error
    useEffect(() => {
        newSeed.current = genSeedphrase(wordArr, seedPhraseLenght);
        setSeedPhrase(newSeed.current);
    }, [wordArr, seedPhraseLenght, isRunning]);
    return (
        <div className="mb-2">
            <span className="text-gray-600 font-medium">{eng_str__consoleStatus.checkLabel}</span> <span className="font-medium">{seedPhrase}</span>
        </div>
    );
};
