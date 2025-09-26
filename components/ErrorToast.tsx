
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const ErrorToast: React.FC = () => {
    const { error, setError } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (error) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [error]);

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className="fixed top-24 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in"
            role="alert"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-grow">{error}</span>
            <button 
                onClick={() => setError(null)}
                className="p-1 rounded-full hover:bg-red-700 transition-colors"
                aria-label="Dismiss error message"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ErrorToast;
