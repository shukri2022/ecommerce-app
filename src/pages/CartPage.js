import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate(); // Use navigate to programmatically navigate

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some products before proceeding to checkout.');
    } else {
      navigate('/checkout'); // Navigate to checkout page
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <span>x {item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Proceed to Checkout</button> {/* Add onClick handler */}
    </div>
  );
};

export default CartPage;

