

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { ADMIN_USER } from '../constants';

const AdminLoginPage: React.FC = () => {
    const { login, setError } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
            login({ email, name: 'Admin', isAdmin: true });
            navigate('/admin');
        } else {
            setError('Invalid admin credentials.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleLogin} className="bg-[--color-bg-secondary] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Admin Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-[--color-bg-tertiary] border-[--color-border] leading-tight focus:outline-none focus:shadow-outline focus:border-[--color-accent]"
                        id="email"
                        type="email"
                        placeholder="admin@admin.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-[--color-bg-tertiary] border-[--color-border] leading-tight focus:outline-none focus:shadow-outline focus:border-[--color-accent]"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        // FIX: Corrected typo from `e.targe...` to `e.target`.
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-[--color-accent] hover:bg-[--color-accent-darker] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLoginPage;
