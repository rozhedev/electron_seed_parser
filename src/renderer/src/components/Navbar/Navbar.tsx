import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_PORT } from "@renderer/data/constants";
import { getHostname } from "@renderer/helpers";
import { TNavbar } from "./types";
import { eng_str__ui } from "@renderer/data";
import { ic_logout } from "@renderer/data/icons";
import { API_CHANNELS } from "@shared/channels";

export const Navbar: FC<TNavbar> = ({}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLogout = async () => {
        const res = await fetch(getHostname("http", SERVER_PORT, API_CHANNELS.logout), {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            navigate("/");
        } else console.error("Failed to logout");
    };

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:border-b-2 md:border-gray-200">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{eng_str__ui.dashboardTitle}</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    className="burger-btn"
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <span className="sr-only">{eng_str__ui.openMenu}</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
                    id="navbar-solid-bg"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link
                                to={"/"}
                                className="link"
                                onClick={handleLogout}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 fill-transparent"
                                >
                                    {ic_logout}
                                </svg>
                                <span className="ml-2">{eng_str__ui.logout}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
