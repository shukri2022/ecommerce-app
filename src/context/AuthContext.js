import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(); // Create context for auth

// AuthProvider will wrap the app and provide authentication state and methods
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data
  const [loading, setLoading] = useState(true); // Controls loading state

  useEffect(() => {
    // Firebase listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Loading done after getting the user
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Firebase login
  };

  const logout = async () => {
    return signOut(auth); // Firebase logout
  };

  // Provide auth context to children
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Only render children when loading is done */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook to use Auth context
export default AuthProvider; // Default export


