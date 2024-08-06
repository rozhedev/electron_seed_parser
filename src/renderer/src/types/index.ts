import { ObjectId } from "mongoose";
import { Dispatch, SetStateAction } from "react";

export type TUser = {
    _id?: ObjectId;
    tg_username: string;
    name: string;
    password: string;
    sended_seed: string[];
    is_search_started: boolean;
    is_seed_sended: boolean;
};

export type TIsUserExist = TUser | null; 

export type TUserProjection = Partial<Record<"_id" | "tg_username" | "name" | "password" | "sended_seed" | "is_search_started" | "is_seed_sended", number>>;

export type TRunningState = {
    isRunning: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
};

export type TComputed = { [key: string]: string };

export type TFormData = {
    password: string;
};

export type TUpdateSeedData = TFormData & {
    bool : boolean;
};

export type TLoginCb = (cb: (res: { success: boolean; message?: string }) => void) => void;

export type TGetSeedListCb = (cb: (res: { payload: TIsUserExist }) => void) => void;
