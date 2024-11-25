export const API_CHANNELS = {
    logout: "logout",
    authCheck: "auth-check",
    authValidate: "auth-validate",
    onLoginRes: "on-login-res",
    updSeed: "update-seed",
    onUpdSeed: "on-update-seed",
    updSearchStatus: "update-search-status",
    sendActivityLog: "send-activity-log",
};

export type ApiChannelsUnion = (typeof API_CHANNELS)[keyof typeof API_CHANNELS];
