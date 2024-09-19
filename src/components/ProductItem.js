import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.image && <img src={product.image} alt={product.name} />}
    </div>
  );
};

export default ProductItem;

