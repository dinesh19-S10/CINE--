
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const BookingViewer: React.FC = () => {
    const { bookingHistory, language } = useContext(AppContext);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
            {bookingHistory.length === 0 ? (
                <p>No bookings have been made yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-[--color-border]">
                                <th className="text-left p-2">Booking ID</th>
                                <th className="text-left p-2">Movie</th>
                                <th className="text-left p-2">Theater</th>
                                <th className="text-left p-2">Seats</th>
                                <th className="text-left p-2">Total Price</th>
                                <th className="text-left p-2">Booking Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingHistory.map(booking => (
                                <tr key={booking.id} className="border-b border-[--color-border] hover:bg-[--color-bg-tertiary]">
                                    <td className="p-2 font-mono text-xs">{booking.id}</td>
                                    <td className="p-2">{booking.movie.title[language]}</td>
                                    <td className="p-2">{booking.theater.name}</td>
                                    <td className="p-2">{booking.seats.map(s => s.number).join(', ')}</td>
                                    <td className="p-2">₹{booking.totalPrice.toFixed(2)}</td>
                                    <td className="p-2">{booking.bookingTime.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingViewer;
