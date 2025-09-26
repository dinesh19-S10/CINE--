import React, { useState, useMemo, useContext } from 'react';
import { Movie, Showtime, Seat, SeatStatus, Theater } from '../types';
import { AppContext } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface SeatSelectorProps {
    movie: Movie;
    theater: Theater;
    showtime: Showtime;
    onSeatsSelected: (seats: Seat[]) => void;
}

const SeatComponent: React.FC<{ seat: Seat; onClick: (seat: Seat) => void; }> = ({ seat, onClick }) => {
    const getSeatClasses = () => {
        let baseClass = "w-8 h-8 md:w-10 md:h-10 rounded-t-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-all duration-200";
        switch (seat.status) {
            case SeatStatus.AVAILABLE:
                return `${baseClass} bg-gray-600 hover:bg-[--color-success-darker] text-white`;
            case SeatStatus.BOOKED:
                return `${baseClass} bg-gray-800 text-gray-600 cursor-not-allowed`;
            case SeatStatus.SELECTED:
                return `${baseClass} bg-[--color-success-darker] text-white ring-2 ring-[--color-success]`;
            default:
                return baseClass;
        }
    };
    
    const isClickable = seat.status !== SeatStatus.BOOKED;

    return (
        <div className={getSeatClasses()} onClick={() => isClickable && onClick(seat)}>
            {seat.number}
        </div>
    );
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ movie, theater, showtime, onSeatsSelected }) => {
    const { language } = useContext(AppContext);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const handleSeatClick = (seat: Seat) => {
        setSelectedSeats(prev => {
            const isSelected = prev.some(s => s.id === seat.id);
            if (isSelected) {
                return prev.filter(s => s.id !== seat.id);
            } else {
                return [...prev, seat];
            }
        });
    };

    const seatingLayoutWithSelection = useMemo(() => {
        return showtime.seating.map(row => 
            row.map(seat => {
                const isSelected = selectedSeats.some(s => s.id === seat.id);
                if (isSelected) {
                    return { ...seat, status: SeatStatus.SELECTED };
                }
                return seat;
            })
        );
    }, [showtime.seating, selectedSeats]);

    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0);
    }, [selectedSeats]);

    const Legend = () => (
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 p-4 bg-[--color-bg-secondary] rounded-lg">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gray-600"></div><span className="text-sm">{t('available', language)}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[--color-success-darker]"></div><span className="text-sm">{t('selected', language)}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gray-800 border border-gray-600"></div><span className="text-sm">{t('booked', language)}</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">{movie.title[language]}</h2>
                <p className="text-xl text-[--color-text-secondary]">{theater.name}</p>
                <p className="text-lg text-[--color-text-muted]">{t('screen', language)} {showtime.screen} - {showtime.time}</p>
            </div>
            
            <div className="w-full max-w-4xl p-4 overflow-x-auto">
                <div className="w-full h-2 mb-8 bg-gray-200 rounded-full shadow-lg shadow-white/20" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}></div>
                <p className="text-center text-[--color-text-muted] mb-4">{t('screen_this_way', language)}</p>
                <div className="flex flex-col items-center gap-2">
                    {seatingLayoutWithSelection.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2">
                            {row.map(seat => (
                                <SeatComponent key={seat.id} seat={seat} onClick={handleSeatClick} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Legend />
            
            <div className="sticky bottom-0 w-full bg-[--color-bg-primary]/80 backdrop-blur-sm p-4 mt-8">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">{t('selected_seats', language)}: <span className="text-[--color-accent]">{selectedSeats.map(s => s.number).join(', ')}</span></h3>
                        <p className="text-2xl font-bold">{t('total', language)}: <span className="text-[--color-success]">₹{totalPrice.toFixed(2)}</span></p>
                    </div>
                    <button 
                        onClick={() => onSeatsSelected(selectedSeats)}
                        disabled={selectedSeats.length === 0}
                        className="bg-[--color-success-darker] hover:bg-[--color-success-hover] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                        {t('confirm_selection', language)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelector;