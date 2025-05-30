import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { addItemToCart } from '../store/cartSlice';
import { menuAPI } from '../services/api';
import ErrorBoundary from './ErrorBoundary';

const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  Pasta: "https://images.unsplash.com/photo-1645112290557-1a6c2a0e0d1d?w=500",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
  Starters: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500",
  Dessert: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
};

const Body = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await menuAPI.getMenuItems();
        setMenuItems(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addItemToCart(item));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="body">
        <div className="body-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="food-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="food-card">
              <div className="food-image-container">
                <img 
                  src={item.img || categoryImages[item.category]} 
                  alt={item.name} 
                  className="food-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = categoryImages[item.category];
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
    </ErrorBoundary>
  );
};

export default Body; 