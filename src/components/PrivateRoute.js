import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assuming AuthContext is set up

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();  // Check if user is authenticated

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
