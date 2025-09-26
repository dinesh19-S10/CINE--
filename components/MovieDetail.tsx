
import React, { useState, useContext } from 'react';
import { Movie, Showtime } from '../types';
import { getMovieFunFact } from '../services/geminiService';
import { AppContext } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface MovieDetailProps {
    movie: Movie;
    onSelectShowtimeAndDate: (showtime: Showtime, date: Date) => void;
}

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.12 2.12M15.88 15.88L18 18M4.93 19.07l2.12-2.12M19.07 4.93l-2.12 2.12M12 2v2m0 18v-2m9-9h-2m-2-7h-2" />
    </svg>
);

const getNext7Days = (): Date[] => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }
    return days;
};

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onSelectShowtimeAndDate }) => {
    const { language } = useContext(AppContext);
    const [funFact, setFunFact] = useState<string>('');
    const [factError, setFactError] = useState<string | null>(null);
    const [isLoadingFact, setIsLoadingFact] = useState<boolean>(false);
    
    const [availableDates] = useState(getNext7Days());
    const [selectedDate, setSelectedDate] = useState<Date>(availableDates[0]);

    const handleGetFunFact = async () => {
        setIsLoadingFact(true);
        setFunFact('');
        setFactError(null);
        const result = await getMovieFunFact(movie.title.en); // Use English title for Gemini
        if (result.fact) {
            setFunFact(result.fact);
        } else {
            setFactError(result.error);
        }
        setIsLoadingFact(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex-shrink-0">
                <img src={movie.posterUrl} alt={movie.title[language]} className="rounded-lg shadow-lg w-full" />
            </div>
            <div className="md:w-2/3">
                <h2 className="text-4xl font-extrabold mb-2 text-[--color-text-primary]">{movie.title[language]}</h2>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[--color-text-muted]">{movie.genre}</span>
                    <div className="flex items-center text-[--color-rating]">
                        <StarIcon className="w-5 h-5"/>
                        <span className="text-[--color-text-primary] ml-1 font-semibold">{movie.rating} / 10</span>
                    </div>
                </div>
                <p className="text-[--color-text-secondary] leading-relaxed mb-6">{movie.synopsis[language]}</p>
                
                <div className="mb-6">
                    <button
                        onClick={handleGetFunFact}
                        disabled={isLoadingFact}
                        className="flex items-center gap-2 bg-[--color-accent] hover:bg-[--color-accent-darker] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SparkleIcon className="w-5 h-5" />
                        {isLoadingFact ? t('thinking', language) : t('get_ai_fun_fact', language)}
                    </button>
                    {isLoadingFact && <div className="mt-2 text-sm text-[--color-accent]">{t('gemini_generating_fact', language)}</div>}
                    {funFact && (
                        <div className="mt-4 p-4 bg-[--color-bg-secondary] border border-[--color-accent] rounded-lg">
                            <p className="text-[--color-text-secondary]">{funFact}</p>
                        </div>
                    )}
                    {factError && (
                         <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                            <p><strong>Oops!</strong> {factError}</p>
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 border-l-4 border-[--color-accent] pl-4">{t('select_date', language)}</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                        {availableDates.map(date => {
                            const isSelected = selectedDate.toDateString() === date.toDateString();
                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => setSelectedDate(date)}
                                    className={`flex-shrink-0 text-center rounded-lg p-3 w-20 transition-colors duration-200 ${
                                        isSelected 
                                        ? 'bg-[--color-accent-hover] text-white font-bold shadow-lg' 
                                        : 'bg-[--color-bg-tertiary] hover:bg-[--color-border]'
                                    }`}
                                >
                                    <p className="text-sm font-semibold">{date.toLocaleDateString(language, { weekday: 'short' })}</p>
                                    <p className="text-2xl font-bold">{date.getDate()}</p>
                                    <p className="text-xs">{date.toLocaleDateString(language, { month: 'short' })}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>


                <div>
                    <h3 className="text-2xl font-bold mb-4 border-l-4 border-[--color-accent] pl-4">{t('showtimes', language)}</h3>
                    <div className="flex flex-wrap gap-3">
                        {movie.showtimes.map(showtime => (
                            <button
                                key={showtime.id}
                                onClick={() => onSelectShowtimeAndDate(showtime, selectedDate)}
                                className="bg-[--color-bg-tertiary] hover:bg-[--color-accent-hover] text-[--color-text-primary] font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                {showtime.time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
