import { StateAction, TRunningState } from "@renderer/types";

type TMessages = string[];
export type TSeedGateway = Partial<TRunningState> & {
    className: string;
    messages: TMessages;
    setMessages: StateAction<TMessages>;
    tokenPass: string;
};
