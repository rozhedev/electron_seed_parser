import "./assets/main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import { AuthProvider } from "./providers/AuthContext/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </React.StrictMode>
);
