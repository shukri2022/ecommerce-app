import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const OrderPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const ordersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Orders fetched:', ordersArray); // Log fetched orders
        setOrders(ordersArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error); // Log error
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>Total: ${order.total}</p>
            <p>Products: {order.productIds.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;

