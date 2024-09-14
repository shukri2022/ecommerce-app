// src/components/ProductItem.js
import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
