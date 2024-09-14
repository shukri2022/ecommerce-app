// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Firebase Auth Context

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />; // Redirect to login if not authenticated
  }

  return children;
};

export default PrivateRoute;

