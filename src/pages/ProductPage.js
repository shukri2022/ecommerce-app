import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebase'; // Firestore instance

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); // Fetch products from Firestore
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsArray);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
