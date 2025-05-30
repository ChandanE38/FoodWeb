import { useState } from "react";
// import { LOGO_URL } from "../utils/constants"; // Removed import
import { Link, useNavigate } from "react-router-dom";
// import useOnlineStatus from "../utils/useOnlineStatus"; // Removed import
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaHome, FaInfoCircle, FaEnvelope, FaChevronDown, FaClipboardList } from 'react-icons/fa';
import useAuthStore from './store/auth';
import './styles/Header.css';

// Define LOGO_URL directly as a placeholder
const LOGO_URL = "https://via.placeholder.com/150"; // Placeholder URL

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useSelector((store) => store.cart.items);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // const onlineStatus = useOnlineStatus(); // Removed usage

  const handleLoginToggle = () => {
    console.log('Login toggle clicked, isAuthenticated:', isAuthenticated); // Debug log
    if (isAuthenticated) {
      console.log('Logging out...'); // Debug log
      logout();
      console.log('Logout complete, navigating to login...'); // Debug log
      navigate('/login');
    } else {
      console.log('Not authenticated, navigating to login...'); // Debug log
      navigate('/login');
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and App Name */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img 
              className="logo" 
              src="https://img.icons8.com/color/48/000000/restaurant.png" 
              alt="FoodWeb Logo" 
            />
            <span className="app-name">FoodApp</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            {/* <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li> */} {/* Removed display */}
            <li>
              <Link to="/" className="nav-link">
                <FaHome className="inline mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="nav-link">Menu</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                <FaInfoCircle className="inline mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                <FaEnvelope className="inline mr-2" />
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="profile-dropdown-container">
                <button 
                  className="profile-button"
                  onClick={toggleProfileDropdown}
                >
                  <FaUser />
                  <span>{user?.name || 'Profile'}</span>
                  <FaChevronDown className={`dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`} />
                </button>
                {isProfileDropdownOpen && (
                  <ul className="profile-dropdown-menu">
                    <li className="dropdown-header">
                      Signed in as<br />
                      <strong>{user?.name || 'User'}</strong>
                      {user?.number && <p>{user.number}</p>}
                    </li>
                    <li>
                      <Link to="/orders" className="dropdown-item" onClick={toggleProfileDropdown}>
                         <FaClipboardList className="inline mr-2" /> Order History
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaUser className="inline mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li>
                <button 
                  className="login-btn"
                  onClick={handleLoginToggle}
                >
                  <FaUser />
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;