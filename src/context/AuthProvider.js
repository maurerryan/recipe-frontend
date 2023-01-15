import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: (username, password) => {
                    setUser('rryherd');
                },
                logout: () => {
                    setUser(null);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};