import { app, shell, BrowserWindow, BrowserWindowConstructorOptions as WindowOptions, ipcMain } from "electron";
import { join, resolve } from "path";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { electronApp, optimizer } from "@electron-toolkit/utils";
import { createFileRoute } from "electron-router-dom";
import { getHostname } from "../renderer/src/helpers";
import User from "../renderer/src/models/User";
import { TFormData } from "../renderer/src/types";
import { DB_URI } from "../renderer/src/data/env";
import { SERVER_PORT, UI_CONTENT } from "../renderer/src/data/init-data";


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
        width: 900,
        height: 670,
        show: false,
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
                return res.status(401).send(UI_CONTENT.authErr);
            }

            res.status(200).send("Login succesful");
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    });
    // * Dashboard logic
    expressApp.get("/dashboard", async (_req, res) => {
        try {
            res.status(200);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
    // * Auth Check
    expressApp.get("/auth-check", (_req, res) => {
        res.status(200).send("Authenticated");
    });
    // * Logout logic
    expressApp.post("/logout", (_req, res) => {
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

ipcMain.handle("api-login", async (_e: any, data: TFormData) => {
    const res = await fetch(getHostname("http", SERVER_PORT, "login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
});

ipcMain.on("auth-validate", async (e, formData: TFormData) => {
    try {
        const user = await User.findOne({ password: formData.password });

        if (!user || user === null) {
            e.reply("login-res", { success: false, message: UI_CONTENT.authErr });
        }
    } catch (error) {
        console.log(error);

        e.reply("login-res", { success: true });
    }
});

ipcMain.handle("api-dashboard", async () => {
    const res = await fetch(getHostname("http", SERVER_PORT, "dashboard"), {
        method: "GET",
        credentials: "include",
    });
    return await res.json();
});

ipcMain.handle("api-auth-check", async () => {
    const res = await fetch(getHostname("http", SERVER_PORT, "auth-check"), {
        method: "GET",
        credentials: "include",
    });
    return await res.json();
});

ipcMain.handle("api-logout", async () => {
    const res = await fetch(getHostname("http", SERVER_PORT, "logout"), {
        method: "GET",
        credentials: "include",
    });
    return await res.json();
});
