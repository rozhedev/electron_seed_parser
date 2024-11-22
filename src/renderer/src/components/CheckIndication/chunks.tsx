import { eng_str__consoleStatus } from "@renderer/data";
import Btn from "@renderer/ui/Btn/Btn";
import React, { FC } from "react";

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

type TIndicatorBtn = {
    btnClass: string;
    onClick: () => void;
    label: string;
    icon: React.JSX.Element;
    disabled?: boolean;
};

export const IndicatorBtn: FC<TIndicatorBtn> = ({ btnClass, onClick, label, icon, disabled }) => (
    <Btn
        type="button"
        className={`btn ${btnClass}`}
        onClick={onClick}
        disabled={disabled}
    >
        <span className="pr-2">{label}</span>
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 fill-transparent"
        >
            {icon}
        </svg>
    </Btn>
);
