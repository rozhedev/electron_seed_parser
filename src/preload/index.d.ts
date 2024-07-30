import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            login: (data: TFormData) => void;
            dashboard: () => void;
            logout: () => void;
            authCheck: () => void;
            authValid: (data: TFormData) => void;
            onLoginRes: (callback: (response: { success: boolean; message?: string; payload?: TUser }) => void) => void;
        };
    }
}
