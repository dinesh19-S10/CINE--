import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import BookingHistoryPage from './components/BookingHistoryPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPage from './components/AdminPage';
import ErrorToast from './components/ErrorToast';
import { AppContext } from './contexts/AppContext';
import LoginSelectionPage from './components/LoginSelectionPage';

const App: React.FC = () => {
    const { user } = React.useContext(AppContext);

    return (
        <Router>
            <div className="bg-[--color-bg-primary] text-[--color-text-primary] min-h-screen font-sans">
                <Header />
                <main className="container mx-auto p-4 md:p-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginSelectionPage />} />
                        <Route path="/login/user" element={<LoginPage />} />
                        <Route path="/login/admin" element={<AdminLoginPage />} />
                        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
                        <Route path="/bookings" element={user ? <BookingHistoryPage /> : <Navigate to="/login" />} />
                        <Route 
                            path="/admin" 
                            element={
                                user?.isAdmin ? <AdminPage /> : <Navigate to="/login/admin" />
                            } 
                        />
                    </Routes>
                </main>
                <ErrorToast />
            </div>
        </Router>
    );
};

export default App;