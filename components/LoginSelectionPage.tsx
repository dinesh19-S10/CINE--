
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { t } from '../utils/translations';

const LoginSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useContext(AppContext);

    return (
        <div className="max-w-md mx-auto mt-20 text-center">
            <h1 className="text-4xl font-bold mb-8">{t('welcome_to_cineverse', language)}</h1>
            <p className="text-[--color-text-secondary] mb-8">{t('select_login_type', language)}</p>
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/login/user')}
                    className="w-full bg-[--color-accent] hover:bg-[--color-accent-darker] text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors"
                >
                    {t('login_as_user', language)}
                </button>
                <button
                    onClick={() => navigate('/login/admin')}
                    className="w-full bg-[--color-bg-secondary] hover:bg-[--color-bg-tertiary] text-[--color-text-primary] font-bold py-3 px-4 rounded-lg text-lg transition-colors"
                >
                    {t('login_as_admin', language)}
                </button>
            </div>
        </div>
    );
};

export default LoginSelectionPage;