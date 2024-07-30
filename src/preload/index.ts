import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { TFormData, TGetSeedListCb, TLoginCb } from "../renderer/src/types/index";

const api = {
    logout: () => ipcRenderer.invoke("api-logout"),
    authCheck: () => ipcRenderer.invoke("api-auth-check"),
    authValid: (data: TFormData) => {
        ipcRenderer.send("auth-validate", data);
    },
    onLoginRes: (cb: TLoginCb) => {
        ipcRenderer.on("login-res", (_, res) => cb(res));
    },
    getSeedList: (cb: TGetSeedListCb) => {
        ipcRenderer.on("get-seed-list", (_, res) => cb(res));
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
