

import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Language } from '../types';

const Header: React.FC = () => {
    const { language, setLanguage, selectedCity, citiesWithTheaters, setSelectedCity, user, logout } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const cities = Object.keys(citiesWithTheaters);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-[--color-accent] text-white' : 'text-[--color-text-secondary] hover:bg-[--color-bg-secondary] hover:text-white'
        }`;

    return (
        <header className="bg-[--color-bg-primary]/80 backdrop-blur-sm sticky top-0 z-40 shadow-md">
            <nav className="container mx-auto px-4 md:px-6 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-[--color-accent]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M7 8h10v8H7z" />
                        </svg>
                        <span className="text-2xl font-bold text-white">CineVerse</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                         <select
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="bg-[--color-bg-secondary] border border-[--color-border] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[--color-accent]"
                        >
                            {cities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        <div className="flex items-center space-x-1 bg-[--color-bg-secondary] p-1 rounded-md">
                            <button onClick={() => handleLanguageChange('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-[--color-accent] text-white' : 'text-gray-400 hover:bg-[--color-bg-tertiary]'}`}>EN</button>
                            <button onClick={() => handleLanguageChange('ta')} className={`px-2 py-1 text-xs rounded ${language === 'ta' ? 'bg-[--color-accent] text-white' : 'text-gray-400 hover:bg-[--color-bg-tertiary]'}`}>TA</button>
                        </div>
                        
                        {user ? (
                             <div className="flex items-center space-x-2">
                                {user.isAdmin && <NavLink to="/admin" className={navLinkClasses}>Admin</NavLink>}
                                <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
                                <NavLink to="/bookings" className={navLinkClasses}>History</NavLink>
                                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/20">Logout</button>
                             </div>
                        ) : (
                            <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 pb-4">
                        {user ? (
                            <>
                                {user.isAdmin && <NavLink to="/admin" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>}
                                <NavLink to="/profile" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
                                <NavLink to="/bookings" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Booking History</NavLink>
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-red-400 hover:bg-red-500/20">Logout</button>
                            </>
                        ) : (
                            <NavLink to="/login" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                        )}
                        <div className="pt-4 border-t border-[--color-border] space-y-3">
                             <select
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="w-full bg-[--color-bg-secondary] border border-[--color-border] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[--color-accent]"
                            >
                                {cities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                            <div className="flex items-center space-x-2 mt-2">
                                <button onClick={() => handleLanguageChange('en')} className={`w-full py-2 text-sm rounded ${language === 'en' ? 'bg-[--color-accent] text-white' : 'bg-[--color-bg-secondary] text-gray-400'}`}>English</button>
                                <button onClick={() => handleLanguageChange('ta')} className={`w-full py-2 text-sm rounded ${language === 'ta' ? 'bg-[--color-accent] text-white' : 'bg-[--color-bg-secondary] text-gray-400'}`}>தமிழ்</button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;