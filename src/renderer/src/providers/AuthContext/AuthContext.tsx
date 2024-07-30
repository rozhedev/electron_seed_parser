import React, { createContext, useContext, useState, ReactNode, FC } from "react";
import { TFormData } from "../../types/index";

type TIsUserExist = TFormData | undefined;
type AuthContextProps = {
    data: TIsUserExist;
    setData: (data: TIsUserExist) => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<TIsUserExist>(undefined);
    return <AuthContext.Provider value={{ data, setData }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
