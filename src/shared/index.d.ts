import { API_CHANNELS } from "./channels";

declare global {
    export const API_CHANNELS: {
        logout: string;
        authCheck: string;
        authValidate: string;
        onLoginRes: string;
        updSeed: string;
        onUpdSeed: string;
        updSearchStatus: string;
        sendActivityLog: string;
    };
    export type ApiChannelsUnion = (typeof API_CHANNELS)[keyof typeof API_CHANNELS];
}
