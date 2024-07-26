"use client";

import React, { ChangeEvent, FC, SyntheticEvent, useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { UI_CONTENT, logMessages, TOKEN_LENGHT } from "../../data/init-data";
import { infoRounded } from "../../data/icons";
import { TLoginForm } from "./types";
import { sendLog } from "../../helpers";
import { NEXT_PUBLIC_ADMIN_LOG_CHANNEL, NEXT_PUBLIC_TG_BOT_TOKEN } from "../../data/env";

const FORM_INIT_VALUES = {
    password: "",
};

export const LoginForm: FC<TLoginForm> = ({}) => {
    const [formData, setFormData] = useState<Record<"password", string>>(FORM_INIT_VALUES);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { password } = formData;
        setIsLoading(true);

        try {
            // const res = await signIn("credentials", {
            //     password,
            //     redirect: false,
            // });
            // setIsLoading(false);
            // if (res?.error) {
            //     setError(UI_CONTENT.authErr.invalidToken);
            //     return;
            // }
            
            // * If you get 400 error, clear cookie and restart PC
            sendLog(NEXT_PUBLIC_TG_BOT_TOKEN, NEXT_PUBLIC_ADMIN_LOG_CHANNEL, logMessages.authorized);
            // router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-xl font-semibold leading-9 tracking-normal text-gray-900">Введите токен для входа</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div className="bg-indigo-100 flex flex-1 items-center rounded-lg px-3 py-2 text-sm text-indigo-900">
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-indigo-900 w-10 stroke-1"
                            >
                                {infoRounded}
                            </svg>
                            <span className="pl-3">Токен должен состоять из 12 символов, только цифры и маленькие буквы</span>
                        </div>
                        <div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    required
                                    className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Токен"
                                    minLength={TOKEN_LENGHT}
                                    maxLength={TOKEN_LENGHT}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                />
                            </div>
                            {error && <small className="text-red-600 font-semibold">{UI_CONTENT.authErr.invalidToken}</small>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="btn--auth"
                                disabled={isLoading}
                            >
                                {isLoading ? UI_CONTENT.loginBtn.loading : UI_CONTENT.loginBtn.default}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
