import React, { useState } from 'react';
import '../src/index.css';
import { menuItems } from './menuData';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredItems.map((item, idx) => (
          <li key={item.id || idx} className="menu-list-item-simple">
            <span className="menu-item-name">{item.name}</span>
            <span> - </span>
            <span className="menu-item-price">₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu; 