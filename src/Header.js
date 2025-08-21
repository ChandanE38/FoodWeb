import { useState } from "react";
// import { LOGO_URL } from "../utils/constants"; // Removed import
import { Link, useNavigate } from "react-router-dom";
// import useOnlineStatus from "../utils/useOnlineStatus"; // Removed import
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaHome, FaInfoCircle, FaEnvelope, FaChevronDown, FaClipboardList } from 'react-icons/fa';
import useAuthStore from './store/auth';

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
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center no-underline gap-2">
            <img 
              className="h-12 w-auto transition-transform duration-300 hover:scale-105" 
              src="https://img.icons8.com/color/48/000000/restaurant.png" 
              alt="FoodWeb Logo" 
            />
            <span className="text-xl font-bold text-gray-700 ml-2">FoodApp</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-6 list-none m-0 p-0 flex-nowrap">
            <li>
              <Link to="/" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-md transition-all duration-300 relative whitespace-nowrap hover:text-blue-500 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300">
                <FaHome className="inline mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-md transition-all duration-300 relative whitespace-nowrap hover:text-blue-500 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300">Menu</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-md transition-all duration-300 relative whitespace-nowrap hover:text-blue-500 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300">
                <FaInfoCircle className="inline mr-2" />
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 no-underline font-medium text-base px-4 py-2 rounded-md transition-all duration-300 relative whitespace-nowrap hover:text-blue-500 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300">
                <FaEnvelope className="inline mr-2" />
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 whitespace-nowrap relative hover:bg-blue-600">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-4 text-center leading-tight">{cartItems.length}</span>
                )}
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="relative">
                <button 
                  className="bg-none border-none text-blue-500 font-medium text-base px-4 py-2 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-2 hover:text-blue-600"
                  onClick={toggleProfileDropdown}
                >
                  <FaUser />
                  <span>{user?.name || 'Profile'}</span>
                  <FaChevronDown className={`transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileDropdownOpen && (
                  <ul className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg list-none p-0 m-0 min-w-48 z-50 overflow-hidden">
                    <li className="px-5 py-4 border-b border-gray-200 mb-2 text-sm text-gray-600">
                      Signed in as<br />
                      <strong className="block text-gray-800 text-base mt-1 font-bold">{user?.name || 'User'}</strong>
                      {user?.number && <p className="text-sm text-gray-500 mt-1">{user.number}</p>}
                    </li>
                    <li>
                      <Link to="/orders" className="flex items-center px-5 py-3 text-gray-700 no-underline text-sm transition-colors duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900" onClick={toggleProfileDropdown}>
                         <FaClipboardList className="inline mr-2" /> Order History
                      </Link>
                    </li>
                    <li>
                      <button className="flex items-center px-5 py-3 text-gray-700 text-sm transition-colors duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900 bg-gray-50 w-full text-left border-none font-medium" onClick={handleLogout}>
                        <FaUser className="inline mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li>
                <button 
                  className="bg-green-500 text-white px-6 py-2 rounded-md font-medium border-none cursor-pointer transition-colors duration-300 whitespace-nowrap flex items-center gap-2 hover:bg-green-600"
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