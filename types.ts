

export type Language = 'en' | 'ta';

export interface LocalizedString {
    en: string;
    ta: string;
}

export enum SeatStatus {
    AVAILABLE = 'AVAILABLE',
    BOOKED = 'BOOKED',
    SELECTED = 'SELECTED',
}

export interface Seat {
    id: string;
    number: string;
    status: SeatStatus;
    price: number;
}

export interface Showtime {
    id: number;
    time: string;
    screen: number;
    seating: Seat[][];
}

export interface Movie {
    id: number;
    title: LocalizedString;
    posterUrl: string;
    genre: string;
    rating: number;
    synopsis: LocalizedString;
    showtimes: Showtime[];
}

export interface Theater {
    id: number;
    name: string;
}

export interface Booking {
    id: string;
    movie: Movie;
    theater: Theater;
    showtime: Showtime;
    seats: Seat[];
    showDate: Date;
    bookingTime: Date;
    totalPrice: number;
}

export interface User {
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface AppContextType {
    // State
    movies: Movie[];
    theaters: Theater[];
    citiesWithTheaters: Record<string, Theater[]>;
    selectedCity: string;
    language: Language;
    user: User | null;
    bookingHistory: Booking[];
    error: string | null;

    // Actions
    setLanguage: (language: Language) => void;
    setSelectedCity: (city: string) => void;
    login: (user: User) => void;
    logout: () => void;
    addBooking: (booking: Omit<Booking, 'id' | 'bookingTime' | 'totalPrice'> & {totalPrice: number}) => void;
    setError: (error: string | null) => void;
    
    // Admin Actions
    addOrUpdateMovie: (movie: Movie) => void;
    deleteMovie: (movieId: number) => void;
}