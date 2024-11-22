import React from "react";
import { eng_str__consoleStatus } from "@renderer/data";

export const MappedLogItem = ({ arr }: { arr: string[] }): React.JSX.Element => (
    <>
        {arr &&
            arr.map((item, index) => (
                <div
                    className="mb-2"
                    key={index}
                >
                    <span className="text-gray-600 font-medium">{eng_str__consoleStatus.checkLabel}</span> <span className="font-medium">{item}</span>
                </div>
            ))}
    </>
);
