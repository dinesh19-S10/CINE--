
import React, { useState } from 'react';
import MovieManager from './admin/MovieManager';
import TheaterManager from './admin/TheaterManager';
import BookingViewer from './admin/BookingViewer';

type AdminTab = 'movies' | 'theaters' | 'bookings';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('movies');

    const renderContent = () => {
        switch (activeTab) {
            case 'movies':
                return <MovieManager />;
            case 'theaters':
                return <TheaterManager />;
            case 'bookings':
                return <BookingViewer />;
            default:
                return null;
        }
    };

    const TabButton: React.FC<{ tab: AdminTab; label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === tab 
                ? 'bg-[--color-bg-secondary] text-[--color-accent] border-b-2 border-[--color-accent]' 
                : 'text-[--color-text-muted] hover:text-[--color-text-primary]'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="border-b border-[--color-border] flex space-x-4">
                <TabButton tab="movies" label="Manage Movies" />
                <TabButton tab="theaters" label="Manage Theaters" />
                <TabButton tab="bookings" label="View Bookings" />
            </div>
            <div className="p-4 bg-[--color-bg-secondary] rounded-b-lg">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;
