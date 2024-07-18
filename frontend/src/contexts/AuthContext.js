import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        user: null,
        role: null,
    });

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/auth/status', { withCredentials: true });
            if (response.status === 200) {
                setAuthState({
                    isLoggedIn: true,
                    user: response.data.user,
                    role: response.data.user.role,
                });
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('role', response.data.user.role);
            } else {
                setAuthState({
                    isLoggedIn: false,
                    user: null,
                    role: null,
                });
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            // Toast('error', error);
            setAuthState({
                isLoggedIn: false,
                user: null,
                role: null,
            });
            localStorage.removeItem('user');
            localStorage.removeItem('role');
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = (user) => {
        setAuthState({
            isLoggedIn: true,
            user,
            role: user.role,
        });
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);
    };

    const logout = () => {
        setAuthState({
            isLoggedIn: false,
            user: null,
            role: null,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        axios.post('/api/auth/logout', {}, { withCredentials: true });
    };

    return (
        <AuthContext.Provider value={ { authState, setAuthState, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;

