import React, { useState, useEffect, useContext } from 'react';
import { Movie } from '../../types';
import { AppContext } from '../../contexts/AppContext';

interface AdminMovieModalProps {
    movie: Partial<Movie> | null;
    onClose: () => void;
}

const AdminMovieModal: React.FC<AdminMovieModalProps> = ({ movie, onClose }) => {
    const { addOrUpdateMovie } = useContext(AppContext);
    
    const [formData, setFormData] = useState<Partial<Movie>>({
        title: { en: '', ta: '' },
        synopsis: { en: '', ta: '' },
        posterUrl: '',
        genre: '',
        rating: 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (movie) {
            setFormData(movie);
        }
    }, [movie]);

    if (!movie) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [field, subfield] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [field]: { ...(prev[field as keyof Partial<Movie>] as object), [subfield]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.title?.en) newErrors.titleEn = 'English title is required.';
        if (!formData.title?.ta) newErrors.titleTa = 'Tamil title is required.';
        if (!formData.posterUrl) newErrors.posterUrl = 'Poster URL is required.';
        if (!formData.genre) newErrors.genre = 'Genre is required.';
        if (formData.rating === undefined || isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 10) {
            newErrors.rating = 'Rating must be a number between 0 and 10.';
        }
        if (!formData.synopsis?.en) newErrors.synopsisEn = 'English synopsis is required.';
        if (!formData.synopsis?.ta) newErrors.synopsisTa = 'Tamil synopsis is required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const movieToSave: Movie = {
                id: formData.id || Date.now(), // Create new ID if it's a new movie
                title: formData.title || { en: '', ta: '' },
                posterUrl: formData.posterUrl || '',
                genre: formData.genre || '',
                rating: Number(formData.rating) || 0,
                synopsis: formData.synopsis || { en: '', ta: '' },
                showtimes: formData.showtimes || [], // Preserve existing showtimes
            };
            addOrUpdateMovie(movieToSave);
            onClose();
        }
    };
    
    const FormField: React.FC<{name: string; label: string; error?: string; children: React.ReactNode}> = ({ name, label, error, children }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-[--color-text-secondary] mb-1">{label}</label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[--color-bg-secondary] rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{movie.id ? 'Edit Movie' : 'Add New Movie'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="title.en" label="Title (English)" error={errors.titleEn}>
                            <input id="title.en" name="title.en" type="text" value={formData.title?.en || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                        </FormField>
                         <FormField name="title.ta" label="Title (Tamil)" error={errors.titleTa}>
                            <input id="title.ta" name="title.ta" type="text" value={formData.title?.ta || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                        </FormField>
                    </div>
                     <FormField name="posterUrl" label="Poster URL" error={errors.posterUrl}>
                        <input id="posterUrl" name="posterUrl" type="text" value={formData.posterUrl || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                    </FormField>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="genre" label="Genre" error={errors.genre}>
                            <input id="genre" name="genre" type="text" value={formData.genre || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                        </FormField>
                        <FormField name="rating" label="Rating (0-10)" error={errors.rating}>
                           <input id="rating" name="rating" type="number" step="0.1" value={formData.rating || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                        </FormField>
                    </div>
                     <FormField name="synopsis.en" label="Synopsis (English)" error={errors.synopsisEn}>
                        <textarea id="synopsis.en" name="synopsis.en" rows={3} value={formData.synopsis?.en || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                    </FormField>
                     <FormField name="synopsis.ta" label="Synopsis (Tamil)" error={errors.synopsisTa}>
                        <textarea id="synopsis.ta" name="synopsis.ta" rows={3} value={formData.synopsis?.ta || ''} onChange={handleChange} className="w-full bg-[--color-bg-tertiary] border-2 border-[--color-border] rounded-md py-2 px-3 focus:border-[--color-accent] focus:outline-none"/>
                    </FormField>
                    
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-[--color-accent] hover:bg-[--color-accent-darker] text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Save Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminMovieModal;