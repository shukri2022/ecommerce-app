// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Fetch cart items for the current user
  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'cartItems'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(items);
      };

      fetchCartItems();
    }
  }, [user]);

  const addToCart = async (product) => {
    const newItem = { ...product, userId: user.uid };
    await addDoc(collection(db, 'cartItems'), newItem);
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = async (itemId) => {
    // Firebase delete logic would go here
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
