import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { TFormData, TGetSeedListCb, TLoginCb, TSendLogData, TUpdateSeedData } from "../renderer/src/types/index";

const api = {
    logout: () => ipcRenderer.invoke("api-logout"),
    authCheck: () => ipcRenderer.invoke("api-auth-check"),
    authValid: (data: TFormData) => {
        ipcRenderer.send("auth-validate", data);
    },
    onLoginRes: (cb: TLoginCb) => {
        ipcRenderer.on("on-login-res", (_, res) => cb(res));
    },
    updateSeed: (data: TFormData) => {
        ipcRenderer.send("update-seed", data);
    },
    onUpdateSeed: (cb: TGetSeedListCb) => {
        ipcRenderer.on("on-update-seed", (_, res) => cb(res));
    },
    updateSearchStatus: (data: TUpdateSeedData) => {
        ipcRenderer.send("update-search-status", data);
    },
    sendActivityLog: (data: TSendLogData) => {
        ipcRenderer.send("update-search-status", data);
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
