import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on initial load
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login({ email, password });
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            await authService.register({ name, email, password });
            toast.success('Registration successful! Please login.');
            return true;
        } catch (error) {
            toast.error(error.response?.data || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.name === 'admin', // Assuming admin role based on name
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};