import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Booking, Language } from '../types';

const QRIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h4v4h-4v-4zm0 6h4v2h-4v-2zM19 13h2v2h-2v-2zm0-6h2v2h-2V7z"/>
    </svg>
);

const QRCodeModal: React.FC<{ booking: Booking; onClose: () => void; }> = ({ booking, onClose }) => {
    const { language } = useContext(AppContext);

    const qrData = `
Movie: ${booking.movie.title[language]}
Theater: ${booking.theater.name}
Date: ${booking.showDate.toLocaleDateString()}
Time: ${booking.showtime.time}
Seats: ${booking.seats.map(s => s.number).join(', ')}
Booking ID: ${booking.id}
    `.trim();

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-[--color-bg-secondary] rounded-xl shadow-2xl p-6 md:p-8 text-center max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 text-[--color-text-muted] hover:text-[--color-text-primary] rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-2xl font-bold text-[--color-accent] mb-1">{booking.movie.title[language]}</h3>
                <p className="text-lg font-semibold text-[--color-text-secondary] mb-4">{booking.theater.name}</p>
                
                <div className="bg-white p-4 rounded-lg inline-block">
                    <img src={qrCodeUrl} alt="Booking QR Code" width="256" height="256" />
                </div>
                
                <div className="text-left mt-4 space-y-1 text-[--color-text-primary]">
                    <p><strong className="text-[--color-text-secondary] w-16 inline-block">Date:</strong> {booking.showDate.toLocaleDateString()} at {booking.showtime.time}</p>
                    <p><strong className="text-[--color-text-secondary] w-16 inline-block">Seats:</strong> <span className="font-mono text-[--color-accent]">{booking.seats.map(s => s.number).join(', ')}</span></p>
                    <p><strong className="text-[--color-text-secondary] w-16 inline-block">Total:</strong> <span className="font-bold text-[--color-success]">₹{booking.totalPrice.toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    );
};


const BookingTicket: React.FC<{ booking: Booking; onShowQR: (booking: Booking) => void }> = ({ booking, onShowQR }) => {
    const { language } = useContext(AppContext);
    
    return (
        <div className="bg-[--color-bg-secondary] rounded-lg shadow-lg flex overflow-hidden relative">
            <div className="w-1/3">
                 <img src={booking.movie.posterUrl} alt={booking.movie.title[language]} className="w-full h-full object-cover"/>
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold">{booking.movie.title[language]}</h3>
                    <p className="text-md font-semibold text-[--color-text-secondary]">{booking.theater.name}</p>
                    <p className="text-sm text-[--color-text-muted]">Screen {booking.showtime.screen} - {booking.showtime.time}</p>
                    <p className="text-sm text-[--color-text-muted]">Show Date: {booking.showDate.toLocaleDateString()}</p>
                    <p className="text-sm text-[--color-text-muted]">Booked on: {booking.bookingTime.toLocaleDateString()}</p>
                </div>
                <div className="mt-2">
                    <p className="text-xs text-[--color-text-muted]">Seats</p>
                    <div className="flex flex-wrap gap-1">
                        {booking.seats.map(seat => (
                            <span key={seat.id} className="text-sm font-semibold text-[--color-accent]">{seat.number}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-2 text-right">
                    <p className="text-lg font-bold text-[--color-success]">₹{booking.totalPrice.toFixed(2)}</p>
                </div>
            </div>
             <button 
                onClick={() => onShowQR(booking)} 
                className="absolute top-2 right-2 p-2 rounded-full bg-[--color-bg-tertiary]/50 hover:bg-[--color-bg-tertiary] transition-colors"
                title="Show QR Code"
                aria-label="Show QR Code for this booking"
            >
                <QRIcon className="w-5 h-5 text-[--color-text-primary]" />
            </button>
        </div>
    );
}

const BookingHistoryPage: React.FC = () => {
    const { bookingHistory } = useContext(AppContext);
    const [qrCodeBooking, setQrCodeBooking] = useState<Booking | null>(null);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[--color-accent] pl-4">Booking History</h2>
            {bookingHistory.length === 0 ? (
                <p className="text-[--color-text-muted] text-center py-10">You have no past bookings.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookingHistory.map(booking => (
                        <BookingTicket key={booking.id} booking={booking} onShowQR={setQrCodeBooking} />
                    ))}
                </div>
            )}
            {qrCodeBooking && <QRCodeModal booking={qrCodeBooking} onClose={() => setQrCodeBooking(null)} />}
        </div>
    );
};

export default BookingHistoryPage;
