import React, { FC } from "react";
import { TCoinItem } from "./types";
import { ic_checkmark } from "@renderer/data/icons";

export const CoinItem: FC<TCoinItem> = ({ icon, checked, onChange }) => {
    return (
        <div className="flex flex-col items-center rounded-md bg-gray-100 px-5 py-3 min-w-20 border border-gray-200">
            <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 fill-white"
            >
                {icon}
            </svg>
            <div className="relative">
                <input
                    type="checkbox"
                    id="password"
                    name="password"
                    required
                    className={`peer mt-2 appearance-none h-6 w-6 border border-gray-300 rounded-md bg-white checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onChange={onChange}
                    checked={checked}
                />
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-2.5 left-[2.5px] w-6 fill-blue-500 stroke-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                >
                    {ic_checkmark}
                </svg>
            </div>
        </div>
    );
};
