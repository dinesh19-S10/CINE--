
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ProfilePage: React.FC = () => {
    const { user } = useContext(AppContext);

    if (!user) {
        return <p>Loading user profile...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-[--color-bg-secondary] rounded-lg shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[--color-accent] pl-4">My Profile</h2>
            <div className="flex items-center gap-6">
                 <div className="w-24 h-24 bg-[--color-bg-tertiary] rounded-full flex items-center justify-center">
                     <span className="text-4xl font-bold text-[--color-accent]">{user.name.charAt(0)}</span>
                </div>
                <div className="space-y-2">
                    <div>
                        <p className="text-sm text-[--color-text-muted]">Name</p>
                        <p className="text-xl font-semibold">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[--color-text-muted]">Email</p>
                        <p className="text-xl font-semibold">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
