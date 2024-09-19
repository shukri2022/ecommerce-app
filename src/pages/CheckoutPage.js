import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CheckoutPage = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      userId: user.uid,
      fullName,
      shippingAddress,
      productIds: [/* Add product IDs from cart */],
      // total: /* {Calculate the total price from cart items }/
      createdAt: new Date()
    };

    console.log('Order data being sent:', orderData); // Log order data before sending

    try {
      const orderRef = collection(db, 'orders');
      await addDoc(orderRef, orderData);
      console.log('Order successfully placed!'); // Log success message
      setLoading(false);
      // Redirect to orders page or show success message
    } catch (error) {
      console.error('Error placing order:', error); // Log error
      setError('Error placing order');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Shipping Address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Place Order</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CheckoutPage;



