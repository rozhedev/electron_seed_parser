import { useState } from "react";
import CheckIndication from "./components/CheckIndication";
import SeedGateway from "./components/SeedGateway";
import Navbar from "./components/Navbar";

function App(): JSX.Element {
    //   const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);

    return (
        <div>
            <Navbar />
            <div className="max-w-screen-xl mx-auto">
                <div className="stopwatch text-left my-10">
                    {/* <div>{session?.user?.name}</div> */}
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

export default App;
