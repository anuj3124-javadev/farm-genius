// Cart.js
import React, { useEffect, useState } from 'react';
import '../../styles.css';
import { useAppContext } from '../../context/AppContext';

const Cart = () => {
  const { baseURL} = useAppContext();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseURL}/cart-itemlist`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, );

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${baseURL}/buyer/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="bcart-container">
      <h1 className="bcart-title">Your Cart</h1>
      <div className="bcart-grid">
        {cartItems.map(item => (
          <div className="bcart-card" key={item.id}>
            <img src={item.image} alt={item.name} className="bcart-img" />
            <h2 className="bcart-name">{item.name}</h2>
            <p className="bcart-price">₹{item.price}</p>
            <button className="bcart-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;