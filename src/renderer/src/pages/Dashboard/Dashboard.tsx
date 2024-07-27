import React, { useState } from "react";
import Navbar from "@renderer/components/Navbar";
import CheckIndication from "@renderer/components/CheckIndication";
import SeedGateway from "@renderer/components/SeedGateway";

export function Dashboard() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    // const win = window as any;

    //   useEffect(() => {
    //     win.ipc.on('message', (messages: string) => {
    //       setMessages()
    //     })
    //   }, [])

    return (
        <div className="dashboard">
            <Navbar />
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
