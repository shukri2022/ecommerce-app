import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing error

    try {
      // Firebase Authentication: Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in successfully:', user);
      
      // Redirect to profile page after successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);

      // Handle specific Firebase errors for invalid credentials
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email. Please sign up.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please check your email address.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credential. Please try again.');
          break;
        default:
          setError('Login failed. Please check your credentials and try again.');
          break;
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Show error message if present */}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


