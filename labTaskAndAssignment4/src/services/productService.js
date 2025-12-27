import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            // Change from 'Authorization: Bearer ${token}' to 'x-auth-token: ${token}'
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const productService = {
    getAllProducts: async (page = 1, perPage = 10) => {
        const response = await api.get(`/product?page=${page}&perPage=${perPage}`);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await api.post('/product', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await api.put(`/product/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    },
};