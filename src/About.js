import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About FoodWeb</h1>
        <p className="tagline">Delicious Food, Delivered to Your Doorstep</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, FoodWeb has been serving delicious meals to our valued customers.
            We started with a simple mission: to provide high-quality food with exceptional service.
            Today, we're proud to be one of the most trusted food delivery services in the city.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We strive to deliver the best dining experience right to your doorstep.
            Our commitment to quality ingredients, expert preparation, and timely delivery
            sets us apart from the rest.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Quality Food</h3>
              <p>We use only the freshest ingredients to prepare your meals.</p>
            </div>
            <div className="feature">
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery service to your location.</p>
            </div>
            <div className="feature">
              <h3>Variety</h3>
              <p>Extensive menu with options for every taste and preference.</p>
            </div>
            <div className="feature">
              <h3>Customer Service</h3>
              <p>24/7 support to ensure your complete satisfaction.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced chefs, dedicated delivery personnel,
            and customer service representatives who work together to ensure
            the best possible experience for our customers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 