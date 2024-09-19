import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: email.split('@')[0],  // Using the part of the email before '@' as a name
        email: user.email,
        number: '',  // You can later add more fields like phone number if needed
      });

      console.log('User registered successfully and data saved in Firestore:', user);
      
      // Set success message
      setSuccessMessage('You have successfully signed up! Redirecting to profile...');
      setTimeout(() => {
        navigate('/profile'); // Redirect after a short delay
      }, 2000);
    } catch (error) {
      console.error('Sign-up error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use. Please log in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format. Please enter a valid email.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      } else {
        setError('Error signing up. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error === 'The email address is already in use. Please log in instead.' && (
        <p>
          Already have an account? <a href="/login">Log in here</a>
        </p>
      )}
    </div>
  );
};

export default Signup;
