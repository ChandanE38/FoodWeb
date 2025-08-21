import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Assuming axios is used for API calls

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
      <div className="max-w-3xl mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-center text-gray-600">Loading order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-sm text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-center text-gray-600">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-center mb-5 text-gray-800 text-2xl font-bold">Order History</h2>
      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="mb-2 pb-2 border-b border-gray-200">
              <p className="my-1 text-sm text-gray-600"><strong className="text-gray-800">Order ID:</strong> {order._id}</p>
              <p className="my-1 text-sm text-gray-600"><strong className="text-gray-800">Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="my-1 text-sm text-gray-600"><strong className="text-gray-800">Total:</strong> ₹{order.totalAmount}</p>
              <p className="my-1 text-sm text-gray-600"><strong className="text-gray-800">Status:</strong> {order.status}</p>
            </div>
            <div>
              <h4 className="mt-0 mb-2 text-gray-800 text-base font-medium">Items:</h4>
              <ul className="list-none p-0 m-0">
                {order.items.map((item, index) => (
                  <li key={index} className="mb-1 text-sm text-gray-700">{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</li>
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