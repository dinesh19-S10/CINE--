
import React, { useState, useContext, useEffect } from 'react';
import { Movie, Showtime, Seat, Theater } from '../types';
import { AppContext } from '../contexts/AppContext';
import MovieGrid from './MovieGrid';
import MovieDetail from './MovieDetail';
import SeatSelector from './SeatSelector';
import BookingSummary from './BookingSummary';
import TheaterSelectionPage from './TheaterSelectionPage';
import PaymentPage from './PaymentPage';

type BookingStep = 'THEATER_SELECTION' | 'MOVIE_SELECTION' | 'MOVIE_DETAIL' | 'SEAT_SELECTION' | 'BOOKING_SUMMARY' | 'PAYMENT';

const HomePage: React.FC = () => {
    const { addBooking, selectedCity } = useContext(AppContext);

    const [step, setStep] = useState<BookingStep>('THEATER_SELECTION');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
    const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    useEffect(() => {
        // Reset flow if city changes
        setStep('THEATER_SELECTION');
        setSelectedMovie(null);
        setSelectedTheater(null);
        setSelectedShowtime(null);
        setSelectedDate(null);
        setSelectedSeats([]);
    }, [selectedCity]);

    const handleTheaterSelect = (theater: Theater) => {
        setSelectedTheater(theater);
        setStep('MOVIE_SELECTION');
    };

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
        setStep('MOVIE_DETAIL');
    };

    const handleShowtimeAndDateSelect = (showtime: Showtime, date: Date) => {
        setSelectedShowtime(showtime);
        setSelectedDate(date);
        setStep('SEAT_SELECTION');
    };

    const handleSeatsSelected = (seats: Seat[]) => {
        setSelectedSeats(seats);
        setStep('BOOKING_SUMMARY');
    };

    const handleConfirmBooking = () => {
        setStep('PAYMENT');
    };

    const handlePaymentSuccess = () => {
        if (selectedMovie && selectedTheater && selectedShowtime && selectedDate && selectedSeats.length > 0) {
            addBooking({
                movie: selectedMovie,
                theater: selectedTheater,
                showtime: selectedShowtime,
                seats: selectedSeats,
                showDate: selectedDate,
                totalPrice: selectedSeats.reduce((total, seat) => total + seat.price, 0),
            });
            alert('Booking successful!');
            // Reset state for a new booking
            setStep('THEATER_SELECTION');
            setSelectedMovie(null);
            setSelectedTheater(null);
            setSelectedShowtime(null);
            setSelectedDate(null);
            setSelectedSeats([]);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'THEATER_SELECTION':
                return <TheaterSelectionPage onSelectTheater={handleTheaterSelect} />;
            case 'MOVIE_SELECTION':
                return <MovieGrid onSelectMovie={handleMovieSelect} />;
            case 'MOVIE_DETAIL':
                if (!selectedMovie) return <p>Loading movie...</p>;
                return <MovieDetail movie={selectedMovie} onSelectShowtimeAndDate={handleShowtimeAndDateSelect} />;
            case 'SEAT_SELECTION':
                if (!selectedMovie || !selectedTheater || !selectedShowtime) return <p>Loading seat selection...</p>;
                return <SeatSelector movie={selectedMovie} theater={selectedTheater} showtime={selectedShowtime} onSeatsSelected={handleSeatsSelected} />;
            case 'BOOKING_SUMMARY':
                if (!selectedMovie || !selectedTheater || !selectedShowtime || !selectedDate || selectedSeats.length === 0) return <p>Loading summary...</p>;
                return <BookingSummary movie={selectedMovie} theater={selectedTheater} showtime={selectedShowtime} selectedSeats={selectedSeats} date={selectedDate} onConfirm={handleConfirmBooking} />;
            case 'PAYMENT':
                if (selectedSeats.length === 0) return <p>Loading payment...</p>;
                return <PaymentPage selectedSeats={selectedSeats} onPaymentSuccess={handlePaymentSuccess} />;
            default:
                return <TheaterSelectionPage onSelectTheater={handleTheaterSelect} />;
        }
    };

    return <div>{renderStep()}</div>;
};

export default HomePage;
