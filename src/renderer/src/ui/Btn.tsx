import React, { FC } from "react";
import { ButtonHTMLAttributes } from "react";

type TBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    id?: string;
    className: string;
    children: React.ReactNode;
};

export const Btn: FC<TBtnProps> = ({ id, type, className, children, disabled = false, onClick }) => (
    <button
        id={id}
        type={type}
        className={`btn ${className}`}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
);
