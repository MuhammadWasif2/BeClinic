import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        const token = response.data;
        localStorage.setItem(TOKEN_KEY, token);
        return token;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getCurrentUser: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        try {
            // Decode JWT token to get user info
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            return payload;
        } catch (error) {
            return null;
        }
    },
};