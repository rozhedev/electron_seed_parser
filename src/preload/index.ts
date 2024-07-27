import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { TFormData, TLoginCb } from "../renderer/src/types/index";

const api = {
    // register: (data: TFormData) => ipcRenderer.invoke("api-register", data),
    login: (data: TFormData) => ipcRenderer.invoke("api-login", data),
    dashboard: () => ipcRenderer.invoke("api-dashboard"),
    logout: () => ipcRenderer.invoke("api-logout"),
    authCheck: () => ipcRenderer.invoke("api-auth-check"),
    authValid: (data: TFormData) => {
        ipcRenderer.send("auth-validate", data);
    },
    onLoginRes: (callback: TLoginCb) => {
        ipcRenderer.on("login-res", (_, response) => {
            callback(response);
        });
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
