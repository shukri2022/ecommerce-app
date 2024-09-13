import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
    const { cartItems } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: 'credit-card', // default payment method
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the order (this could be sending the order to a backend service)
        axios.post('http://localhost:5000/orders', {
            ...formData,
            items: cartItems,
            total: cartItems.reduce((total, item) => total + item.price, 0),
        })
        .then(() => {
            alert('Order placed successfully!');
            // Optionally clear the cart here
        })
        .catch((error) => {
            console.error('Error processing order:', error);
            alert('Error processing order.');
        });
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h1>Checkout</h1>
            <div className="cart-summary">
                <h2>Order Summary</h2>
                {cartItems.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <p>{item.name} - ${item.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Payment Method:
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    >
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        {/* Add other payment methods as needed */}
                    </select>
                </label>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
