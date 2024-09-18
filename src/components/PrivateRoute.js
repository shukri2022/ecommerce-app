// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the AuthContext is properly imported

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Use AuthContext to get user and loading state

  // Show a loading spinner or message while the authentication state is being determined
  if (loading) {
    return <div>Loading...</div>; 
  }

  // If user is authenticated, render the children components, otherwise redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;





