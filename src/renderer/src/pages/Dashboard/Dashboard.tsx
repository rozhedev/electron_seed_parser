import React, { useEffect, useState } from "react";
import Navbar from "@renderer/components/Navbar";
import CheckIndication from "@renderer/components/CheckIndication";
import SeedGateway from "@renderer/components/SeedGateway";
import { useAuthContext } from "@renderer/providers/AuthContext";
import CoinItem, { AVAILABLE_CUR, TCoinItemData } from "@renderer/components/CoinItem";
import { CoinSymbols, CoinSymbolsUnion } from "@renderer/data/constants";
import { eng__str_err } from "@renderer/data";

export function Dashboard() {
    const { data } = useAuthContext();
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [pass, setPass] = useState<string>("");

    // ? For future versions
    // const [checkedGroup, setCheckedGroup] = useState({
    //     [CoinSymbols.btc]: true,
    //     [CoinSymbols.eth]: true,
    //     [CoinSymbols.ltc]: true,
    //     [CoinSymbols.usdt]: true,
    //     [CoinSymbols.bnb]: true,
    //     [CoinSymbols.sol]: true,
    // });
    // const [checkedErr, setCheckedErr] = useState<boolean>(false);

    // const handleChange = (type: CoinSymbolsUnion) =>
    //     setCheckedGroup((prev) => {
    //         const upd = { ...prev, [type]: !prev[type] };

    //         if (Object.values(upd).every((item) => item === false)) setCheckedErr(true);
    //         else setCheckedErr(false);
    //         return upd;
    //     });
    // ? ----------------------

    useEffect(() => {
        if (data?.password) {
            let temp = data?.password as string;
            setPass(temp);
        } else {
            throw new Error("Token pass not found in AuthContext");
        }
    }, [data]);

    return (
        <div className="dashboard">
            <Navbar />
            <div className="max-w-screen-xl mx-auto">
                <div className="stopwatch text-left mt-3">
                    {/* <h3 className="mb-3">Token pass: {data?.password}</h3> */}
                    <CheckIndication
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        tokenPass={pass}
                    />
                    <SeedGateway
                        className={"console scrollbar-thin mt-3"}
                        messages={messages}
                        setMessages={setMessages}
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        tokenPass={pass}
                    />
                    {/* // ? For future versions */}
                    {/* <div className="my-6">
                        {checkedErr && <div className="text-sm font-medium mb-3 text-red-700">{eng__str_err.coinNotSelected}</div>}
                        <div className="flex flex-wrap gap-6">
                            {AVAILABLE_CUR.map((item: TCoinItemData) => (
                                <CoinItem
                                    key={item.id}
                                    icon={item.icon}
                                    checked={checkedGroup[item.symbol]}
                                    onChange={() => handleChange(item.symbol)}
                                />
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
