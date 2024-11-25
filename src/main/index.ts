import { app, shell, BrowserWindow, BrowserWindowConstructorOptions as WindowOptions, ipcMain } from "electron";
import path, { join } from "path";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { electronApp, optimizer } from "@electron-toolkit/utils";
import { createFileRoute } from "electron-router-dom";
import { getHostname, sendLog } from "../renderer/src/helpers";
import User from "../renderer/src/models/User";
import { TFormData, TSendLogData, TUpdateSeedData } from "../renderer/src/types";
import { DB_URI } from "../renderer/src/data/env";
import { SERVER_PORT } from "../renderer/src/data/constants";
import { eng__str_err } from "../renderer/src/data";

enum API_CHANNELS {
    logout = "logout",
    authCheck = "auth-check",
    authValidate = "auth-validate",
    onLoginRes = "on-login-res",
    updSeed = "update-seed",
    onUpdSeed = "on-update-seed",
    updSearchStatus = "update-search-status",
    sendActivityLog = "send-activity-log",
}

function createWindow(id: string, options: WindowOptions = {}): any {
    const mainWindow = new BrowserWindow({ ...options });
    // * File route by window ID
    const fileRoute = createFileRoute(join(__dirname, "../renderer/index.html"), id);

    mainWindow.loadFile(...fileRoute);

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });
    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    return mainWindow;
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId("com.electron");

    app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });
    createWindow("main", {
        width: 380,
        height: 900,
        show: false,
        icon: join(__dirname, "renderer/src/assets/icons/icon.ico"),
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false,
        },
    });
    const expressApp = express();

    // * Cors usage
    const headers = ["Content-Type: application/json", 'Access-Control-Allow-Origin: "*"'];

    expressApp.use(
        cors({
            allowedHeaders: headers,
            origin: getHostname("http", SERVER_PORT, ""),
            credentials: true,
        })
    );

    expressApp.use(express.json());

    mongoose.connect(DB_URI);

    // * Auth logic
    expressApp.post("/", async (req: any, res: any) => {
        const { password } = req.body;

        try {
            // * Don't change checking order
            const user = await User.findOne({ password });
            if (!user || user === null) {
                return res.status(401).send(eng__str_err.invalidToken);
            }

            res.status(200).send("Login succesful");
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    });
    // * Auth Check
    expressApp.get(`/${API_CHANNELS.authCheck}`, (_req, res) => {
        res.status(200).send("Authenticated");
    });
    // * Logout logic
    expressApp.post(`/${API_CHANNELS.logout}`, (_req, res) => {
        res.status(200);
    });
    expressApp.listen(SERVER_PORT, () => {
        console.log(`Server is running on ${getHostname("http", SERVER_PORT, "")}`);
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on(API_CHANNELS.authValidate, async (e, formData: TFormData) => {
    const user = await User.findOne({ password: formData.password });
    try {
        if (!user || user === null) {
            e.reply(API_CHANNELS.onLoginRes, { success: false, message: eng__str_err.invalidToken });
        } else {
            e.reply(API_CHANNELS.onLoginRes, { success: true });
        }
    } catch (error) {
        console.error(error);
    }
});

ipcMain.on(API_CHANNELS.updSeed, async (e, formData: TFormData) => {
    const seedList: any = await User.findOne({ password: formData.password }, { _id: 0, sended_seed: 1 });
    try {
        e.reply(API_CHANNELS.onUpdSeed, { payload: seedList });
    } catch (error) {
        console.error(error);
    }
});

ipcMain.on(API_CHANNELS.updSearchStatus, async (_, data: TUpdateSeedData) => {
    try {
        const updatedUser: any = await User.findOneAndUpdate({ password: data.password }, { is_search_started: data.bool }, { new: true, runValidators: true });
    } catch (error) {
        console.error(error);
    }
});

// ipcMain.on(API_CHANNELS.sendActivityLog, async (_, data: TSendLogData) => {
//     try {
//         sendLog(data.token, data.chatId, data.log)
//     } catch (error) {
//         console.error(error);
//     }
// })

ipcMain.handle(API_CHANNELS.authCheck, async () => {
    const res = await fetch(getHostname("http", SERVER_PORT, API_CHANNELS.authCheck), {
        method: "GET",
        credentials: "include",
    });
    return await res.json();
});

ipcMain.handle(API_CHANNELS.logout, async () => {
    const res = await fetch(getHostname("http", SERVER_PORT, API_CHANNELS.logout), {
        method: "GET",
        credentials: "include",
    });
    return await res.json();
});
