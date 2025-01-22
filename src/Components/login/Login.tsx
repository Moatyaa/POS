'use client';
import React, {FormEvent, ChangeEvent, useEffect} from 'react';
import loginImage from '../../../public/Images/login-hero.png';
import Image from "next/image";
import { useUser } from "@/Context/UserContext";
import useNetworkIP from "@/hooks/useLocalIP";

const Login: React.FC = () => {
    const { login, loginData, setLoginData, loading, error } = useUser();
    const networkIp =  useNetworkIP()

    useEffect(() => {
        if(networkIp){
            setLoginData({ login: '', password: '' ,terminalIdentifier: networkIp});
        }
    }, [networkIp]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login()
    };

    return (
        <section id="login">
            <div className="bg-login-page bg-cover gap-20 bg-no-repeat bg-center w-full !h-[100vh] flex justify-evenly items-center">
                <div className="loginBox w-[50%] bg-white p-8 rounded-lg shadow-lg max-w-sm">
                    <h1 className="text-4xl cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-center mb-6 animate__animated animate__fadeIn animate__delay-1s text-shadow-xl hover:scale-105 hover:text-[#2D71F8] transition-all duration-300">
                        Welcome Back!<br /> Log In to Your POS
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="login"
                                name="login"
                                required
                                value={loginData?.login}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={loginData?.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && (
                            <div className="mb-4 text-red-500 text-center">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 12a8 8 0 0116 0"
                                        />
                                    </svg>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-[50%]">
                    <Image src={loginImage} alt={'hero Image'} className="animate-bounce-custom" />
                </div>
            </div>
        </section>
    );
};

export default Login;
