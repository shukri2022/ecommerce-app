import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // Use the auth context

const CartContext = createContext(); // Create context for cart

// CartProvider will wrap the app and provide cart state and methods
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Holds cart items
  const { user } = useAuth(); // Get the current user from Auth context

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'cartItems'), where('userId', '==', user.uid)); // Query user-specific cart items
          const querySnapshot = await getDocs(q);
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCartItems(items); // Set cart items
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return;

    const newItem = { ...product, userId: user.uid }; // Add user ID to product
    try {
      const docRef = await addDoc(collection(db, 'cartItems'), newItem);
      setCartItems([...cartItems, { id: docRef.id, ...newItem }]); // Update state with new item
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId)); // Remove item from state
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children} {/* Render children */}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); // Hook to use Cart context
export default CartProvider; // Default export

