import React, { useEffect, useState } from "react";
import Navbar from "@renderer/components/Navbar";
import CheckIndication from "@renderer/components/CheckIndication";
import SeedGateway from "@renderer/components/SeedGateway";
import { useAuthContext } from "@renderer/providers/AuthContext";
import { getSendedSeed } from "@renderer/components/SeedGateway/helpers";

export function Dashboard() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [pass, setPass] = useState<string | undefined>(undefined);
    const { data } = useAuthContext();

    useEffect(() => {
        if (data?.password) {
            setPass(data?.password);
            // getSendedSeed(user.name, SENDED_SEED_PROJ, setMessages);
        }
    }, [data]);

    return (
        <div className="dashboard">
            <Navbar />
            <h3>Token name: {pass}</h3>
            <div className="max-w-screen-xl mx-auto">
                <div className="stopwatch text-left my-10">
                    <CheckIndication
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                    />

                    <SeedGateway
                        className={"console mt-4"}
                        messages={messages}
                        setMessages={setMessages}
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                    />
                </div>
            </div>
        </div>
    );
}
