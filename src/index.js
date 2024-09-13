// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import { CartProvider } from './context/CartContext';  // Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <CartProvider> {/* Wrap the app in CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
