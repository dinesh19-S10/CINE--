

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const LoginPage: React.FC = () => {
    const { login } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && name) {
            login({ email, name, isAdmin: false });
            navigate(-1); // Go back to the previous page
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleLogin} className="bg-[--color-bg-secondary] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-[--color-bg-tertiary] border-[--color-border] leading-tight focus:outline-none focus:shadow-outline focus:border-[--color-accent]"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-[--color-bg-tertiary] border-[--color-border] leading-tight focus:outline-none focus:shadow-outline focus:border-[--color-accent]"
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

export default LoginPage;