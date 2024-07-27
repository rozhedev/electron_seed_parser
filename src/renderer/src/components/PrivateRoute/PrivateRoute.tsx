import React, { useEffect, useState, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { SERVER_PORT } from "@renderer/data/init-data";
import { getHostname } from "@renderer/helpers";

type PrivateRouteProps = {
    element: ReactElement;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(getHostname("http", SERVER_PORT, "auth-check"), {
                    credentials: "include",
                });
                setIsAuth(res.ok);
            } catch (error) {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) {
        return <div>Loading...</div>;
    }
    return isAuth ? element : <Navigate to="/" />;
};
