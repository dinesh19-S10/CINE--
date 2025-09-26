import React, { useContext } from 'react';
import { Movie, Showtime, Seat, Theater } from '../types';
import { AppContext } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface BookingSummaryProps {
    movie: Movie;
    theater: Theater;
    showtime: Showtime;
    selectedSeats: Seat[];
    date: Date;
    onConfirm: () => void;
}

const TicketIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
);


const BookingSummary: React.FC<BookingSummaryProps> = ({ movie, theater, showtime, selectedSeats, date, onConfirm }) => {
    const { language } = useContext(AppContext);
    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    const formattedDate = new Intl.DateTimeFormat(language === 'ta' ? 'ta-IN' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).format(date);

    return (
        <div className="max-w-2xl mx-auto bg-[--color-bg-secondary] rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
                <TicketIcon className="w-16 h-16 mx-auto text-[--color-accent] mb-4" />
                <h2 className="text-3xl font-extrabold text-[--color-text-primary]">{t('booking_summary', language)}</h2>
                <p className="text-[--color-text-muted]">{t('review_selection', language)}</p>
            </div>

            <div className="bg-[--color-bg-tertiary] rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <img src={movie.posterUrl} alt={movie.title[language]} className="w-32 h-48 object-cover rounded-md" />
                    <div>
                        <h3 className="text-2xl font-bold">{movie.title[language]}</h3>
                        <p className="text-lg font-semibold text-[--color-text-secondary]">{theater.name}</p>
                        <p className="text-[--color-text-secondary]">{t('screen', language)} {showtime.screen}</p>
                        <p className="text-[--color-text-secondary]">{t('time', language)}: <span className="font-semibold text-[--color-accent]">{showtime.time}</span></p>
                        <p className="text-[--color-text-secondary]">{t('date', language)}: <span className="font-semibold text-[--color-accent]">{formattedDate}</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <h4 className="text-lg font-semibold text-[--color-text-secondary]">{t('selected_seats', language)}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSeats.map(seat => (
                            <span key={seat.id} className="bg-green-500/20 text-[--color-success] text-sm font-medium px-3 py-1 rounded-full">{seat.number}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-[--color-text-secondary]">{t('num_tickets', language)}</h4>
                    <p className="text-xl text-[--color-text-primary]">{selectedSeats.length}</p>
                </div>
            </div>

            <div className="border-t border-[--color-border] pt-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-[--color-text-secondary]">{t('total_price', language)}</span>
                    <span className="text-[--color-success]">₹{totalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <div className="mt-8">
                <button 
                    onClick={onConfirm}
                    className="w-full bg-[--color-accent-hover] hover:bg-[--color-accent-darker] text-white font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300"
                >
                    {t('confirm_proceed_payment', language)}
                </button>
            </div>
        </div>
    );
};

export default BookingSummary;