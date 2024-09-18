import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="vertical-menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
        Products
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
        Cart
      </NavLink>
      <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active' : '')}>
        Checkout
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
        Profile
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
        Orders
      </NavLink>

      {!user ? (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
            Signup
          </NavLink>
        </>
      ) : (
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;


