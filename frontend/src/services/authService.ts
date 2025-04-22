import axios from "axios";

const BASE_URL = "http://localhost:3333";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export const authService = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await axios.post(`${BASE_URL}/user/login`, data);
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await axios.post(`${BASE_URL}/user`, data);
        return response.data;
    }
};