import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        addToast('Kijelentkezés sikeres', 'success');
        navigate('/login');
    };

    return (
        <div className={`flex h-screen w-full items-center justify-center bg-gray-50`}>
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Ez egy egyszerű admin felület</h1>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition"
                >
                    Kijelentkezés
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
