import React from 'react';
import './home.css'; // Ensure your CSS file has the appropriate styling

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to Fahari Store</h1>
        <p>Discover our wide range of products designed to meet your everyday needs. From fashion to electronics, home décor to beauty essentials, we've got everything you need—all in one place.</p>
      </header>

      <section className="best-sellers">
        <h2>Shop Our Best-Sellers</h2>
        <ul>
          <li>Product 1: Stylish Leather Jacket - $129.99</li>
          <li>Product 2: Wireless Bluetooth Headphones - $79.99</li>
          <li>Product 3: Organic Skincare Set - $49.99</li>
        </ul>
      </section>

      <section className="exclusive-offers">
        <h2>Exclusive Offers</h2>
        <ul>
          <li>Offer 1: Buy one, get one free on all t-shirts!</li>
          <li>Offer 2: 20% off your first order with the code: WELCOME20</li>
        </ul>
      </section>

      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <ul>
          <li>Product 4: Modern Minimalist Furniture Set</li>
          <li>Product 5: Smartwatch with Heart Rate Monitor</li>
        </ul>
      </section>

      <section className="why-shop-with-us">
        <h2>Why Shop with Us?</h2>
        <ul>
          <li>Fast & Free Shipping on orders over $50</li>
          <li>Hassle-Free Returns within 30 days</li>
          <li>Secure Payments through trusted platforms</li>
          <li>Customer Support available 24/7</li>
        </ul>
      </section>

      <section className="shop-by-category">
        <h2>Shop By Category</h2>
        <ul>
          <li>Electronics</li>
          <li>Fashion</li>
          <li>Home Decor</li>
          <li>Beauty</li>
          <li>Sports & Outdoors</li>
        </ul>
      </section>

      <section className="customer-reviews">
        <h2>What Our Customers Say</h2>
        <blockquote>
          <p>"The quality of the products is superb, and delivery was faster than expected! Highly recommend." - Alex K.</p>
        </blockquote>
        <blockquote>
          <p>"I had a fantastic experience with their customer service. They went above and beyond to help me." - Emily R.</p>
        </blockquote>
        <blockquote>
          <p>"The products are great, and the site is so easy to use. I will definitely be shopping here again!" - David P.</p>
        </blockquote>
        <blockquote>
          <p>"Excellent shopping experience. The discounts and deals are unbeatable!" - Maria L.</p>
        </blockquote>
      </section>
    </div>
  );
};

export default Home;
