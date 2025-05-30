import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './Header';
import Body from './Body';
import Cart from './cart';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Menu from './Menu';
import './index.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/auth';

// Create a separate component for the app content
const AppContent = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  console.log('AppContent - isAuthenticated:', isAuthenticated); // Debug log
  console.log('AppContent - user:', user); // Debug log

  const handleLogout = () => {
    logout();
  };

  // Determine if the current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={isAuthPage ? 'min-h-screen flex items-center justify-center' : 'app'}>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated ? <Body /> : <Navigate to="/login" />} />
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Toaster />
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;