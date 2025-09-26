
import React, { useState, useCallback } from 'react';
import { AppContextType, Movie, Theater, Language, User, Booking } from '../types';
import { MOVIES, THEATERS, CITIES_WITH_THEATERS } from '../constants';

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>(MOVIES);
    const [theaters] = useState<Theater[]>(THEATERS);
    const [citiesWithTheaters] = useState<Record<string, Theater[]>>(CITIES_WITH_THEATERS);
    const [selectedCity, setSelectedCity] = useState<string>('Chennai');
    const [language, setLanguage] = useState<Language>('en');
    const [user, setUser] = useState<User | null>(null);
    const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback((userData: User) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const addBooking = useCallback((bookingData: Omit<Booking, 'id' | 'bookingTime'>) => {
        const newBooking: Booking = {
            ...bookingData,
            id: `BKG-${Date.now()}`,
            bookingTime: new Date(),
        };
        setBookingHistory(prev => [newBooking, ...prev]);
    }, []);

    const addOrUpdateMovie = useCallback((movie: Movie) => {
        setMovies(prev => {
            const index = prev.findIndex(m => m.id === movie.id);
            if (index > -1) {
                const newMovies = [...prev];
                newMovies[index] = movie;
                return newMovies;
            }
            return [...prev, movie];
        });
    }, []);

    const deleteMovie = useCallback((movieId: number) => {
        setMovies(prev => prev.filter(m => m.id !== movieId));
    }, []);
    
    const contextValue = {
        movies,
        theaters,
        citiesWithTheaters,
        selectedCity,
        language,
        user,
        bookingHistory,
        error,
        setLanguage,
        setSelectedCity,
        login,
        logout,
        addBooking,
        setError,
        addOrUpdateMovie,
        deleteMovie,
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
