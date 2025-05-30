import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Assuming axios is used for API calls
import './styles/OrderHistory.css';

const OrderHistory = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserOrders = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        setError('Please log in to view your order history.');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual backend API endpoint for fetching user orders
        const response = await axios.get('/api/orders/myorders', {
          headers: {
            // Assuming you use a token for authentication
            'x-auth-token': localStorage.getItem('token'), // Or wherever you store your auth token
          },
        });
        
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
        // Display a user-friendly error message
        setError('Failed to load order history. Please ensure you are logged in and try again.');
      } finally {
        setLoading(false);
      }
    };

    getUserOrders();
  }, [isAuthenticated, user]); // Rerun effect if auth status or user changes

  if (loading) {
    return (
      <div className="order-history-container">
        <p>Loading order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-container error">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-container">
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="order-list">
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <div className="order-summary">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
            <div className="order-details">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 