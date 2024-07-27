import React from "react";
import LoginForm from "@renderer/components/LoginForm";

export const Login = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-xl font-semibold leading-9 tracking-normal text-gray-900">Введите токен для входа</h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};
