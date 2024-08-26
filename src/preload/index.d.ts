import { ElectronAPI } from "@electron-toolkit/preload";
import { TSendLogData, TUpdateSeedData } from "@renderer/types";

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {
            logout: () => void;
            authCheck: () => void;
            authValid: (data: TFormData) => void;
            onLoginRes: (cb: (res: { success: boolean; message?: string }) => void) => void;
            updateSeed: (data: TFormData) => void;
            onUpdateSeed: (cb: (res: { success: boolean; payload: TIsUserExist }) => void) => void;
            updateSearchStatus: (data: TUpdateSeedData) => void;
            sendActivityLog: (data: TSendLogData) => void;
        };
    }
}
