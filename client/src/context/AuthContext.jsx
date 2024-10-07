import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserId(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            };

            setUserId(decodedToken.id);
            localStorage.setItem('userId', decodedToken.id);
        } else {
            logout();
        };
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        localStorage.setItem('userId', decodedToken.id);
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;