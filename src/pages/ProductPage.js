// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css';

import ProductItem from '../components/ProductItem';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

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
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
