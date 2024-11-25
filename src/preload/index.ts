import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Don't use alias for preven runtime errors when building
import { TFormData, TGetSeedListCb, TLoginCb, TSendLogData, TUpdateSeedData } from "../renderer/src/types/index";
import { API_CHANNELS } from "../shared/channels";

// ! Don't forget declare methods in index.d.ts
const api = {
    logout: () => ipcRenderer.invoke(API_CHANNELS.logout),
    authCheck: () => ipcRenderer.invoke(API_CHANNELS.authCheck),
    authValid: (data: TFormData) => {
        ipcRenderer.send(API_CHANNELS.authValidate, data);
    },
    onLoginRes: (cb: TLoginCb) => {
        ipcRenderer.on(API_CHANNELS.onLoginRes, (_, res) => cb(res));
    },
    // Data
    updateSeed: (data: TFormData) => {
        ipcRenderer.send(API_CHANNELS.updSeed, data);
    },
    // Callback handler
    onUpdateSeed: (cb: TGetSeedListCb) => {
        ipcRenderer.on(API_CHANNELS.onUpdSeed, (_, res) => cb(res));
    },
    updateSearchStatus: (data: TUpdateSeedData) => {
        ipcRenderer.send(API_CHANNELS.updSearchStatus, data);
    },
    sendActivityLog: (data: TSendLogData) => {
        ipcRenderer.send(API_CHANNELS.sendActivityLog, data);
    },
    removeListener: (channel: string, handler: () => void) => {
        if (typeof handler !== "function") {
            throw new Error(`Handler is not a function`);
        }
        ipcRenderer.removeListener(channel, handler);

        // Temporary solution for memory leaks
        ipcRenderer.setMaxListeners(Infinity);
    },
};

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI);
        contextBridge.exposeInMainWorld("api", api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}
