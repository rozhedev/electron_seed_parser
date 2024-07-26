import { ButtonHTMLAttributes } from "react";

export type TBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    id?: string;
    className: string;
    children: React.ReactNode;
};