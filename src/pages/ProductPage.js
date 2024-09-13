// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import useCart

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Get addToCart function from CartContext

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Add to Cart functionality */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
