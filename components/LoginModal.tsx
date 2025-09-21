import React, { useState } from 'react';

interface LoginModalProps {
    onLogin: (success: boolean) => void;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded credentials for demonstration
        if (username === 'admin' && password === 'password123') {
            setError('');
            onLogin(true);
        } else {
            setError('Nama pengguna atau kata laluan tidak sah.');
            onLogin(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" aria-modal="true" role="dialog">
            <div className="bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl shadow-2xl w-full max-w-sm p-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark">Log Masuk Admin</h2>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Pengguna</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kata Laluan</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-brand-bg-light dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" 
                                required 
                            />
                        </div>
                         {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="mt-6 flex justify-end items-center space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:bg-brand-dark-light dark:text-gray-200 dark:border-gray-600 dark:hover:bg-brand-dark">
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-lg shadow-sm hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                            Log Masuk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};