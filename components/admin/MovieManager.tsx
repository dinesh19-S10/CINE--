import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Movie } from '../../types';
import AdminMovieModal from './AdminMovieModal';
import ConfirmationModal from './ConfirmationModal';

const MovieManager: React.FC = () => {
    const { movies, deleteMovie } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Partial<Movie> | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

    const handleAddMovie = () => {
        setEditingMovie({}); // Empty object for a new movie
        setIsModalOpen(true);
    };

    const handleEditMovie = (movie: Movie) => {
        setEditingMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMovie(null);
    };

    const handleDeleteClick = (movieId: number) => {
        setMovieToDelete(movieId);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (movieToDelete) {
            deleteMovie(movieToDelete);
        }
        setIsConfirmOpen(false);
        setMovieToDelete(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Movies</h2>
                <button 
                    onClick={handleAddMovie}
                    className="bg-[--color-accent] hover:bg-[--color-accent-darker] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    + Add New Movie
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-[--color-border]">
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">Title</th>
                            <th className="text-left p-2">Genre</th>
                            <th className="text-left p-2">Rating</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie.id} className="border-b border-[--color-border] hover:bg-[--color-bg-tertiary]">
                                <td className="p-2">{movie.id}</td>
                                <td className="p-2">{movie.title.en}</td>
                                <td className="p-2">{movie.genre}</td>
                                <td className="p-2">{movie.rating}</td>
                                <td className="p-2">
                                    <button onClick={() => handleEditMovie(movie)} className="text-sm text-blue-400 hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteClick(movie.id)} className="text-sm text-red-400 hover:underline ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && editingMovie && (
                <AdminMovieModal 
                    movie={editingMovie} 
                    onClose={handleCloseModal} 
                />
            )}

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                title="Confirm Deletion"
                message="Are you sure you want to delete this movie? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default MovieManager;