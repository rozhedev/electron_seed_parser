"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { TLogsGenProps } from "./types";
import { genSeedphrase } from "../../helpers";

export const LogsGen: FC<TLogsGenProps> = ({ wordArr, seedPhraseLenght, isRunning }) => {
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const newSeed: any = useRef<string>("");

    // * Necessary useEffect using for prevent too many rerenders error
    useEffect(() => {
        // * Hard type assertion for correct typo selection
        newSeed.current = genSeedphrase(wordArr, seedPhraseLenght);
        setSeedPhrase(newSeed.current);
    }, [wordArr]);
    return <span>Проверено: {seedPhrase}</span>;
};
