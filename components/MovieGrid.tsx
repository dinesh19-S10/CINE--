import React, { useContext } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { AppContext } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface MovieGridProps {
    onSelectMovie: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ onSelectMovie }) => {
    const { movies, language, selectedCity } = useContext(AppContext);
    
    // In a real-world app, you would filter movies based on the selected city.
    // For this demo, we will show all movies regardless of the city.
    const filteredMovies = movies;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[--color-text-primary] border-l-4 border-[--color-accent] pl-4">
                    {t('now_showing', language)}
                </h1>
                <p className="text-lg text-[--color-text-secondary] pl-5">{t('now_showing_in', language)} <span className="font-semibold">{selectedCity}</span></p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
                ))}
            </div>
        </div>
    );
};

export default MovieGrid;