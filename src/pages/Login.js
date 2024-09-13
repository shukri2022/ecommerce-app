import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        login(user);  // Set user data in AuthContext
        navigate('/profile');  // Redirect to profile
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);  // End loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? <p>Loading...</p> : <button type="submit">Login</button>}
      </form>
    </div>
  );
};

export default Login;
