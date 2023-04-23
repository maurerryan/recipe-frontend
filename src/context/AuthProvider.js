import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const value = {
        user,
        setUser,
        error,
        isLoading,
        login: (username, password) => {
            // setUser('rmaurer');
            // SecureStore.setItemAsync('user', 'rmaurer');
            // localStorage.setItem("user", JSON.stringify(response.data));
            const userResponse = {
                token: 'jhg4hjg44hgbmnbuy213gtrfsddf',
                id: 5,
                name: 'Ryan Maurer',
                username: 'rmaurer',
                email: 'rmaurer',
                avatar: 'http://pravatar/yadayada?5',

            };
            setUser(userResponse);
            setError(null);
            localStorage.setItem('user', JSON.stringify(userResponse));
            setIsLoading()
        },
        logout: () => {
            //setUser(null);
            setIsLoading(true);
            // SecureStore.deleteItemAsync('user');
            localStorage.removeItem("user");
        },
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
};