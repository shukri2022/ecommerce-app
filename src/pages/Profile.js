import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';  
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firestore instance

const Profile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          // Fetch user data from Firestore using the user's UID
          const userDoc = await getDoc(doc(db, 'users', user.uid)); 
          if (!userDoc.exists()) {
            throw new Error("User not found");
          }
          setUserData(userDoc.data());
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError("Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Email: {userData.email}</p>
      <p>Phone Number: {userData.number || 'N/A'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;





