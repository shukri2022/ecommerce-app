// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const order = {
      name: formData.name,
      address: formData.address,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Shipping Address"
          required
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
