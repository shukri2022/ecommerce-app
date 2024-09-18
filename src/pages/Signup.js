// src/pages/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase functions
import { auth } from '../firebase'; // Import Firebase auth from your configuration

const Signup = () => {
  const [email, setEmail] = useState(''); // State to store the email
  const [password, setPassword] = useState(''); // State to store the password
  const [message, setMessage] = useState(''); // State to display messages (success/failure)
  const [error, setError] = useState(''); // State to store errors

  // Handle form submission for signup or login
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setError(''); // Reset error message
    setMessage(''); // Reset success message

    try {
      // Try to create a new user with the provided email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Access the user object
      setMessage(`Signup successful! Welcome ${user.email}. You are now signed in.`);
      console.log('User signed up successfully:', user); // Log user information
    } catch (error) {
      // If the email is already registered, log the user in instead
      if (error.code === 'auth/email-already-in-use') {
        try {
          const loginCredential = await signInWithEmailAndPassword(auth, email, password);
          const loggedInUser = loginCredential.user; // Access the logged-in user object
          setMessage(`This email is already registered. Welcome back, ${loggedInUser.email}!`);
          console.log('User logged in successfully:', loggedInUser); // Log user information
        } catch (loginError) {
          setError('Login failed. Please check your password.');
          console.error('Login error:', loginError.message);
        }
      } else {
        // If there is another error (weak password, invalid email, etc.)
        setError(error.message);
        console.error('Signup error:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Signup or Login Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success messages */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign Up or Log In</button>
      </form>
    </div>
  );
};

export default Signup;
