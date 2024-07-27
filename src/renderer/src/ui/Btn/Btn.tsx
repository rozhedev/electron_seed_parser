import  React, { FC } from "react";
import { TBtnProps } from "./types";

const Btn: FC<TBtnProps> = ({ id, type, className, children, disabled = false, onClick }) => {
    return (
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
};

export default Btn;
