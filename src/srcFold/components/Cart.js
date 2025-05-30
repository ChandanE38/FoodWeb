import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import {
  fetchCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCartItems
} from '../store/cartSlice';
import { paymentAPI } from '../services/api';
import ErrorBoundary from './ErrorBoundary';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = React.useState('razorpay');
  const [paymentError, setPaymentError] = React.useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);

  const fetchCartData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await dispatch(fetchCart()).unwrap();
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    fetchCartData();
    return () => {
      // Cleanup function to prevent memory leaks
      setPaymentError(null);
      setIsProcessingPayment(false);
    };
  }, [fetchCartData]);

  const handleQuantityChange = async (itemId, change) => {
    try {
      const item = items.find(item => item._id === itemId);
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        await dispatch(updateItemQuantity({ itemId, quantity: newQuantity })).unwrap();
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeItemFromCart(itemId)).unwrap();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await dispatch(clearCartItems()).unwrap();
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    }
  };

  const subtotal = totalAmount;
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (paymentMethod === 'razorpay') {
      try {
        setIsProcessingPayment(true);
        setPaymentError(null);

        const orderData = {
          amount: total,
          currency: 'INR'
        };
        const response = await paymentAPI.createOrder(orderData);
        
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: response.amount,
          currency: response.currency,
          order_id: response.orderId,
          name: 'Food Delivery',
          description: 'Payment for your order',
          handler: async function (response) {
            try {
              const verificationData = {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature
              };
              await paymentAPI.verifyPayment(verificationData);
              await dispatch(clearCartItems()).unwrap();
              alert('Payment successful!');
            } catch (error) {
              setPaymentError('Payment verification failed. Please contact support.');
              console.error('Payment verification error:', error);
            }
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#e74c3c'
          },
          modal: {
            ondismiss: function() {
              setIsProcessingPayment(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        setPaymentError('Failed to create order. Please try again.');
        console.error('Order creation error:', error);
      } finally {
        setIsProcessingPayment(false);
      }
    } else {
      try {
        setIsProcessingPayment(true);
        await dispatch(clearCartItems()).unwrap();
        alert('Order placed successfully! Pay on delivery.');
      } catch (error) {
        setPaymentError('Failed to place order. Please try again.');
        console.error('Order placement error:', error);
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={fetchCartData}
        >
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingBag size={64} />
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to your cart to get started!</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="cart">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <button 
            className="clear-cart-btn" 
            onClick={handleClearCart}
            disabled={isProcessingPayment}
          >
            <FaTrash /> Clear Cart
          </button>
        </div>

        {paymentError && (
          <div className="payment-error">
            <p>{paymentError}</p>
            <button onClick={() => setPaymentError(null)}>Dismiss</button>
          </div>
        )}

        <div className="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <img 
                src={item.img} 
                alt={item.name} 
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-food.jpg';
                }}
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                <div className="cart-item-price">₹{item.price}</div>
              </div>
              <div className="cart-item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item._id, -1)}
                  disabled={isProcessingPayment}
                >
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item._id, 1)}
                  disabled={isProcessingPayment}
                >
                  <FaPlus />
                </button>
              </div>
              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>
              <button 
                className="remove-item-btn"
                onClick={() => handleRemoveItem(item._id)}
                disabled={isProcessingPayment}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="payment-section">
            <h3>Select Payment Method</h3>
            <div className="payment-methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isProcessingPayment}
                />
                <FaCreditCard />
                <span>Pay Online</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={isProcessingPayment}
                />
                <FaMoneyBillWave />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Cart; 