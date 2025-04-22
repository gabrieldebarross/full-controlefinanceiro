import { JwtPayload } from "./jwtpayload";

export interface AuthContextType {
    user: JwtPayload | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}