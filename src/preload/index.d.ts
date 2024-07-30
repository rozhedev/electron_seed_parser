import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            logout: () => void;
            authCheck: () => void;
            authValid: (data: TFormData) => void;
            onLoginRes: (cb: (res: { success: boolean; message?: string; }) => void) => void;
            getSeedList: (cb: (res: { payload: TIsUserExist }) => void) => void;
        };
    }
}
