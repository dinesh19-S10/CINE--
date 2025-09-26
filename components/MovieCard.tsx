
import React, { useContext } from 'react';
import { Movie } from '../types';
import { AppContext } from '../contexts/AppContext';

interface MovieCardProps {
    movie: Movie;
    onSelectMovie: (movie: Movie) => void;
}

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
    const { language } = useContext(AppContext);

    return (
        <div 
            onClick={() => onSelectMovie(movie)}
            className="bg-[--color-bg-secondary] rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 group"
        >
            <div className="relative">
                <img src={movie.posterUrl} alt={movie.title[language]} className="w-full h-auto aspect-[2/3] object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                     <div className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-white rounded-full px-4 py-2">
                        Book Now
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold truncate text-[--color-text-primary]">{movie.title[language]}</h3>
                <p className="text-sm text-[--color-text-muted] truncate">{movie.genre}</p>
                 <div className="flex items-center text-[--color-rating] mt-2">
                    <StarIcon className="w-5 h-5" />
                    <span className="text-[--color-text-primary] ml-1 font-semibold">{movie.rating}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
