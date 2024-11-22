import React, { useEffect, useState } from "react";
import Navbar from "@renderer/components/Navbar";
import CheckIndication from "@renderer/components/CheckIndication";
import SeedGateway from "@renderer/components/SeedGateway";
import { useAuthContext } from "@renderer/providers/AuthContext";
import CoinItem, { AVAILABLE_CUR, TCoinItemData } from "@renderer/components/CoinItem";
import { CoinSymbols, CoinSymbolsUnion } from "@renderer/data/constants";

export function Dashboard() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [pass, setPass] = useState<string>("");
    const { data } = useAuthContext();

    const [checkedGroup, setCheckedGroup] = useState({
        [CoinSymbols.btc]: true,
        [CoinSymbols.eth]: true,
        [CoinSymbols.ltc]: true,
        [CoinSymbols.usdt]: true,
        [CoinSymbols.bnb]: true,
        [CoinSymbols.sol]: true,
    });

    const handleChange = (type: CoinSymbolsUnion) => setCheckedGroup((prev) => ({ ...prev, [type]: !prev[type] }));

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
                    {/* <div className="flex flex-wrap gap-6 my-6">
                        {AVAILABLE_CUR.map((item: TCoinItemData) => (
                            <CoinItem
                                key={item.id}
                                icon={item.icon}
                                checked={checkedGroup[item.symbol]}
                                onChange={() => handleChange(item.symbol)}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
}
