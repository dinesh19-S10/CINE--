

import React, { useContext } from 'react';
// FIX: Added missing import for useNavigate
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Theater } from '../types';
import { t } from '../utils/translations';

interface TheaterSelectionPageProps {
    onSelectTheater: (theater: Theater) => void;
}

const TheaterSelectionPage: React.FC<TheaterSelectionPageProps> = ({ onSelectTheater }) => {
    const { citiesWithTheaters, selectedCity, language } = useContext(AppContext);

    const theatersForCity = citiesWithTheaters[selectedCity] || [];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[--color-accent] pl-4">{t('select_theater', language)}</h2>
            <p className="text-lg text-[--color-text-secondary] mb-6 pl-5">{t('now_showing_in', language)} <span className="font-semibold">{selectedCity}</span></p>
            
            {theatersForCity.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {theatersForCity.map(theater => (
                        <button
                            key={theater.id}
                            onClick={() => onSelectTheater(theater)}
                            className="p-6 bg-[--color-bg-secondary] rounded-lg text-left hover:bg-[--color-bg-tertiary] hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
                        >
                            <h3 className="text-xl font-bold text-[--color-text-primary]">{theater.name}</h3>
                            <p className="text-sm text-[--color-text-muted]">{selectedCity}</p> 
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-[--color-text-muted]">No theaters found for the selected city.</p>
            )}
        </div>
    );
};

export default TheaterSelectionPage;
