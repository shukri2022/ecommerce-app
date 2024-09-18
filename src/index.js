import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* Ensure AuthProvider is wrapping the app */}
      <CartProvider>  {/* Ensure CartProvider is wrapping the app */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

