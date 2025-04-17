import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { JwtPayload } from "../types/jwtpayload";
import { AuthContextType } from "../types/authcontexttype";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("O useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            if (Date.now() < decodedToken.exp * 1000) {
                setUser(decodedToken);
            } else {
                logout();
            }
        } catch {
            logout();
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUser(decodedToken);
    }

    const logout = (redirectPath: string = "/") => {
        localStorage.removeItem("token");
        setUser(null);
        navigate(redirectPath);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}