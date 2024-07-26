import { TRunningState } from "@/types";
import { Dispatch, SetStateAction } from "react";

type TMessages = string[];
export type TSeedGateway = Partial<TRunningState> & {
    className: string;
    messages: TMessages;
    setMessages: Dispatch<SetStateAction<TMessages>>;
};