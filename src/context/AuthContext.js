import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            return null;
        }
    });

    const login = (userData) => {
        try {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
        } catch (error) {
            console.error('Error storing user data in localStorage:', error);
        }
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem('user'); // Clear user from localStorage
        } catch (error) {
            console.error('Error removing user data from localStorage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
