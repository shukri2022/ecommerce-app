import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Ensure AuthContext is correctly imported
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Ensure Firebase is correctly configured

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        setUserData(userDoc.data());
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>;
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

