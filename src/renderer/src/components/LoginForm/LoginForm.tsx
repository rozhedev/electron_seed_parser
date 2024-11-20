import React, { FormEvent, ChangeEvent, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { eng_str__login, eng_str__authErr, eng_str__btn } from "@renderer/data";
import { ADMIN_LOG_CHANNEL, TG_BOT_TOKEN } from "@renderer/data/env";
import { TOKEN_LENGHT, SERVER_PORT } from "../../data/init-data";
import { infoRounded } from "@renderer/data/icons";

import { TFormData } from "@renderer/types";
import { TLoginForm } from "./types";
import { getHostname, sendLog } from "@renderer/helpers";
import { useAuthContext } from "../../providers/AuthContext";

const FORM_INIT_VALUES = {
    password: "",
};

export const LoginForm: FC<TLoginForm> = ({}) => {
    const [formData, setFormData] = useState<TFormData>(FORM_INIT_VALUES);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setData } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        window.api.onLoginRes((res) => {
            if (res.success) {
                setAuthError(null);
            } else {
                setAuthError(res.message || "An error occurred");
            }
        });
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(getHostname("http", SERVER_PORT, ""), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            window.api.authValid(formData);
            setIsLoading(false);

            if (res.ok) {
                navigate("/dashboard");
                setAuthError(null);
                setData(formData);
                setFormData(FORM_INIT_VALUES);

                // ! ReferenceError: process is not defined
                // sendLog(TG_BOT_TOKEN, ADMIN_LOG_CHANNEL, logMessages.authorized)
                // window.api.sendActivityLog({token: TG_BOT_TOKEN, chatId: ADMIN_LOG_CHANNEL, log: logMessages.authorized});
            }
        } catch (error) {
            console.error("Error when sending data", error);
        }
    };

    return (
        <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit}
        >
            <div className="bg-emerald-50 flex flex-1 items-center rounded-lg px-3 py-2 text-sm text-emerald-900">
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-emerald-900 w-10 stroke-1"
                >
                    {infoRounded}
                </svg>
                <span className="pl-3">{eng_str__login.formNotice}</span>
            </div>
            <div>
                <div>
                    <input
                        id="password"
                        name="password"
                        type="text"
                        required
                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-2 focus:outline-emerald-600 focus:ring-emerald-600 sm:text-sm sm:leading-6"
                        placeholder={eng_str__login.tokenPlaceholder}
                        minLength={TOKEN_LENGHT}
                        maxLength={TOKEN_LENGHT}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password}
                    />
                </div>
                {authError && <small className="text-red-600 font-semibold">{eng_str__authErr.invalidToken}</small>}
            </div>
            <div>
                <button
                    type="submit"
                    className="btn btn--auth"
                    disabled={isLoading}
                >
                    {isLoading ? eng_str__btn.updating : eng_str__btn.login}
                </button>
            </div>
        </form>
    );
};
