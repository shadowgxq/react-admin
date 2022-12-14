import { localStoreageKey } from '../consts/index'
import { http } from '../api/request'
import React, { ReactNode, useState } from 'react'
import * as auth from "../api/auth-provider";

const bootStrapUser = async () => {
    let user = null
    const token = window.localStorage.getItem(localStoreageKey);
    if (token) {
        const data = await http("me", { token });
        user = data.user;
    }
}

interface User {
    token?: string
}
const AuthContext = React.createContext<
    | {
        user: User | null;
        login: (form: auth.IAuthParam) => Promise<void>;
        register: (form: auth.IAuthParam) => Promise<void>;
        logout: () => Promise<void>;
    }
    | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
    const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    return (
        <AuthContext.Provider
            children={children}
            value={{ user, login, register, logout }}
        />
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};