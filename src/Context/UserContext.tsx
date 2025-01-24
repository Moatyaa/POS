'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { userLogin, userLogout } from "@/Services/user";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export interface Credentials {
    login: string;
    password: string;
    terminalIdentifier: string;
}

type UserContextType = {
    loginData: Credentials | null;
    setLoginData: React.Dispatch<React.SetStateAction<Credentials>>;
    login: () => void;
    logout: () => void;
    sharedRefreshToken: string | null;
    loading: boolean;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [loginData, setLoginData] = useState<Credentials>({ login: '', password: '', terminalIdentifier: '' });
    const [sharedRefreshToken, setSharedRefreshToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userLogin(loginData);
            sessionStorage.setItem('userData', JSON.stringify(response.roles));
            sessionStorage.setItem('branchId', JSON.stringify(response.branch_id));
            if (response?.refreshToken) {
                setSharedRefreshToken(response.refreshToken);
                sessionStorage.setItem('refreshToken', response.refreshToken);
                Cookies.set('refreshToken', response.refreshToken, {
                    expires: 1,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                });
                Cookies.set('role', response.roles, {
                    expires: 1,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                });
                router.push('/');
            } else {
                setError('Invalid login response');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setError(`Login failed: ${error || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await userLogout();
        } catch (error) {
            console.error('Logout Error:', error);
            setError(`Logout failed: ${error || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ loginData, setLoginData, login, sharedRefreshToken, loading, error, setError, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
};
