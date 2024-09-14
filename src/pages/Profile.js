// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Use the AuthContext to get user info
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore reference

const ProfilePage = () => {
  const { user, logout } = useAuth(); // Get user from context
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDoc.data());
      };

      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Email: {userData.email}</p>
      <p>Phone Number: {userData.number}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
