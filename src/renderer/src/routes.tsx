import { Router, Route } from "electron-router-dom";
import Login from "./pages/Login";
import { PrivateRoute } from "./ui";
import Dashboard from "./pages/Dashboard";

export default function AppRoutes() {
    return (
        <div>
            <Router
                main={
                    <>
                        <Route
                            path="/"
                            element={<Login />}
                        />
                        <Route
                            path="/dashboard"
                            element={<PrivateRoute element={<Dashboard />} />}
                        />
                    </>
                }
            />
        </div>
    );
}
