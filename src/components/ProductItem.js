import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
