// Cropstore.js
import React, { useEffect, useState } from 'react';
import '../../styles.css';

const Cropstore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://new-api.productsscout.in/cart-itemlist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://new-api.productsscout.in//buyer/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const result = await response.json();
      alert('Added to cart');
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };

  return (
    <div className="cropstore-container">
      <h1 className="cropstore-title">Crop Store</h1>
      <div className="cropstore-grid">
        {products.map((product) => (
          <div className="cropstore-card" key={product.id}>
            <img src={product.image} alt={product.name} className="cropstore-img" />
            <h2 className="cropstore-name">{product.name}</h2>
            <p className="cropstore-price">₹{product.price}</p>
            <p className="cropstore-detail">{product.detail}</p>
            <button className="cropstore-button" onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cropstore; 