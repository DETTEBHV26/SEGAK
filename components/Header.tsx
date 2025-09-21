import React from 'react';
import { LockClosedIcon, SunIcon, MoonIcon } from './icons';

interface HeaderProps {
    isLoggedIn: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogoutClick, theme, toggleTheme }) => {
    return (
        <header className="relative w-full p-4 text-center bg-brand-bg-light dark:bg-brand-bg-dark shadow-md sm:p-6 rounded-b-2xl">
            <div className="flex justify-center items-center">
                <img src="https://i.postimg.cc/gJvq1KcB/LOGO-SK-OBAH.jpg" alt="Logo SK Obah" className="h-20 w-20 sm:h-24 sm:w-24 object-contain" />
            </div>
            <h1 className="mt-2 text-2xl font-bold text-brand-text-light dark:text-brand-text-dark sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-brand-primary-dark to-brand-primary-light">
                Dashboard SEGAK
            </h1>
            <p className="text-sm text-gray-500 sm:text-base dark:text-gray-400">Standard Kecergasan Fizikal Kebangsaan</p>
            <p className="text-sm font-semibold text-gray-600 sm:text-base dark:text-gray-300">SK Obah, Beluran</p>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-brand-dark-light hover:bg-gray-300 dark:hover:bg-brand-dark-light/80 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                {isLoggedIn ? (
                     <button
                        onClick={onLogoutClick}
                        className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        Log Keluar
                    </button>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                    >
                        <LockClosedIcon className="w-4 h-4 mr-2" />
                        Log Masuk Admin
                    </button>
                )}
            </div>
        </header>
    );
};