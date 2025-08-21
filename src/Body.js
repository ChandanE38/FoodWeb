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
    <div className="max-w-6xl mx-auto p-8 bg-gray-50">
      {/* Header section with search */}
      <div className="text-center mb-8">
        <div className="relative max-w-2xl mx-auto mb-4">
          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-full text-base transition-all duration-300 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-lg"
          />
          <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <h1 className="text-4xl text-gray-700 my-4 font-bold">Discover Delicious Food</h1>
      </div>

      {/* Category filter section */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center p-4 bg-white rounded-lg shadow-sm">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-3 border-none rounded-full font-medium cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-0.5 ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Food items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                onError={e => { 
                  e.target.onerror = null; 
                  e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'; 
                }} 
              />
              {item.mrp > item.price && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-2xl font-semibold text-sm">
                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl text-gray-700 mb-2 font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-6">{item.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-bold text-gray-700">₹{item.price}</span>
                {item.mrp > item.price && (
                  <span className="text-base text-gray-400 line-through">₹{item.mrp}</span>
                )}
              </div>
              <button 
                className="w-full px-3 py-3 bg-blue-500 text-white border-none rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 hover:bg-blue-600"
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
        <div className="text-center p-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 text-lg mb-4">No items found matching your search.</p>
          <button 
            className="px-6 py-3 bg-blue-500 text-white border-none rounded-lg font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-600"
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

