/**
 * Body Component
 * 
 * This component represents the main content of the food ordering application.
 * It includes:
 * - A search bar for filtering menu items
 * - Category filters for different food types
 * - A grid of food cards with images, descriptions, and prices
 * - Add to cart functionality
 * 
 * Features:
 * - Responsive grid layout
 * - Dynamic category filtering
 * - Search functionality
 * - Price comparison with MRP
 * - Discount badges
 * - Hover effects and animations
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import './styles/Body.css';

// Image URLs for different food categories
const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  Pasta: "https://images.unsplash.com/photo-1645112290557-1a6c2a0e0d1d?w=500",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
  Starters: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500",
  Dessert: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
};

// Sample menu items with their details
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce, mozzarella, and fresh basil",
    price: 299,
    mrp: 399,
    img: categoryImages.Pizza,
    category: "Pizza"
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Grilled chicken patty with fresh vegetables",
    price: 199,
    mrp: 249,
    img: categoryImages.Burger,
    category: "Burger"
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with parmesan",
    price: 249,
    mrp: 299,
    img: categoryImages.Pasta,
    category: "Pasta"
  },
  {
    id: 4,
    name: "Veg Noodles",
    description: "Stir-fried noodles with mixed vegetables",
    price: 179,
    mrp: 229,
    img: categoryImages.Chinese,
    category: "Chinese"
  },
  {
    id: 5,
    name: "Chicken Wings",
    description: "Spicy fried chicken wings with dipping sauce",
    price: 349,
    mrp: 399,
    img: categoryImages.Starters,
    category: "Starters"
  },
  {
    id: 6,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 149,
    mrp: 199,
    img: categoryImages.Dessert,
    category: "Dessert"
  },
  // Generate additional menu items
  ...Array.from({ length: 100 }, (_, i) => {
    const categories = ["Pizza", "Burger", "Pasta", "Chinese", "Starters", "Dessert"];
    const cat = categories[i % categories.length];
    return {
      id: 7 + i,
      name: `${cat} Special ${i + 1}`,
      description: `Delicious ${cat.toLowerCase()} item number ${i + 1}`,
      price: 100 + ((i * 13) % 300),
      mrp: 120 + ((i * 17) % 350),
      img: categoryImages[cat],
      category: cat
    };
  })
];

/**
 * Main Body component that renders the food menu
 */
const Body = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  // Get unique categories for the filter
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items based on search query and selected category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Handles adding an item to the cart
   * @param {Object} item - The menu item to add to cart
   */
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="body">
      {/* Header section with search */}
      <div className="body-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <h1>Discover Delicious Food</h1>
      </div>

      {/* Category filter section */}
      <div className="category-section">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn${selectedCategory === category ? ' active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Food items grid */}
      <div className="food-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="food-card">
            <div className="food-image-container">
              <img 
                src={item.img} 
                alt={item.name} 
                className="food-image" 
                onError={e => { 
                  e.target.onerror = null; 
                  e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'; 
                }} 
              />
              {item.mrp > item.price && (
                <div className="discount-badge">
                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                </div>
              )}
            </div>
            <div className="food-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="price-info">
                <span className="current-price">₹{item.price}</span>
                {item.mrp > item.price && (
                  <span className="mrp">₹{item.mrp}</span>
                )}
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No items found matching your search.</p>
          <button 
            className="clear-search-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;

