import React, { FC } from "react";
import { Btn } from "./Btn";

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
