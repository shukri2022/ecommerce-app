import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate('/login');
    };

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.number}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
