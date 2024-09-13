import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>To access the products, cart, and checkout, please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link>.</p>
    </div>
  );
};

export default Home;
