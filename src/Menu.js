import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeItemCompletely } from './cartSlice';
import { menuItems } from './menuData';
import { FaShoppingCart, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get quantity of item in cart
  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart! 🍕`);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.name} removed from cart!`);
  };

  // Remove all of an item from cart
  const handleRemoveAll = (item) => {
    dispatch(removeItemCompletely(item.id));
    toast.success(`${item.name} removed from cart!`);
  };

  return (
    <div className="menu-page-simple">
      <h1>Menu</h1>
      <div className="search-container" style={{ maxWidth: 220, margin: '0 0 1.5rem 0' }}>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="menu-list-simple">
        {filteredItems.map((item, idx) => {
          const cartQuantity = getCartQuantity(item.id);
          
          return (
            <li key={item.id || idx} className="menu-list-item-simple" style={{ position: 'relative' }}>
              <div className="menu-item-info">
                <span className="menu-item-name">{item.name}</span>
                <span> - </span>
                <span className="menu-item-price">₹{item.price}</span>
                {cartQuantity === 0 ? (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="add-btn-compact orange"
                    style={{ marginLeft: '10px', minWidth: '54px', fontWeight: 500 }}
                  >
                    <FaPlus size={12} style={{ marginRight: 4 }} />Add
                  </button>
                ) : (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="add-btn-compact red"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span style={{ fontWeight: 'bold', minWidth: '16px', textAlign: 'center', fontSize: '14px' }}>
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="add-btn-compact orange"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                )}
                {/* Remove button at rightmost */}
                {cartQuantity > 0 && (
                  <button
                    className="remove-btn-compact"
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => handleRemoveAll(item)}
                    title="Remove from cart"
                  >
                    <FaTimes size={13} />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu; 