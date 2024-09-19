import React, { useState, useEffect } from 'react';

// Import the mock data
import db from './db.json'; // Assuming you put the db data into a db.json file

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching the products from an API or Firebase
    const fetchProducts = async () => {
      try {
        // Here you can replace with actual Firebase fetching logic
        setProducts(db.products); // Using the products from the db.json
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.name} />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
