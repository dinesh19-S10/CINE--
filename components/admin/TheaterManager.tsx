
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const TheaterManager: React.FC = () => {
    const { theaters } = useContext(AppContext);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Theaters</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-[--color-border]">
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theaters.map(theater => (
                            <tr key={theater.id} className="border-b border-[--color-border] hover:bg-[--color-bg-tertiary]">
                                <td className="p-2">{theater.id}</td>
                                <td className="p-2">{theater.name}</td>
                                <td className="p-2">
                                    <button className="text-sm text-blue-400 hover:underline">Edit</button>
                                    <button className="text-sm text-red-400 hover:underline ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TheaterManager;
