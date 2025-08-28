import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from './cartSlice';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  // API functions for payment processing
  const createRazorpayOrder = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://localhost:4001/api'}/payment/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `HTTP ${response.status}: Failed to create order`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyRazorpayPayment = async (paymentData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://localhost:4001/api'}/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          orderId: paymentData.razorpay_order_id,
          paymentId: paymentData.razorpay_payment_id,
          signature: paymentData.razorpay_signature
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `HTTP ${response.status}: Payment verification failed`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    // Check authentication for online payments
    if (paymentMethod === 'razorpay') {
      const token = localStorage.getItem('token');
      if (!token) {
        setPaymentError('Please login to proceed with online payment.');
        return;
      }
    }

    if (paymentMethod === 'razorpay') {
      try {
        setIsProcessingPayment(true);
        setPaymentError(null);

        // Create order on backend first
        const orderData = await createRazorpayOrder(total);

        const options = {
          key: orderData.key, // Use the key returned from backend
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.orderId,
          name: 'FoodWeb - Delicious Food Delivery',
          description: `Payment for food order - Total: ₹${total}`,
          image: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
          handler: async function (response) {
            try {
              setIsProcessingPayment(true);
              // Verify payment on backend
              await verifyRazorpayPayment(response);
              
              // Clear cart after successful payment
              dispatch(clearCart());
              
              // Show success message
              alert('🎉 Payment successful! Your order has been placed.\nPayment ID: ' + response.razorpay_payment_id);
              
            } catch (error) {
              setPaymentError('Payment verification failed. Please contact support with Payment ID: ' + response.razorpay_payment_id);
              console.error('Payment verification error:', error);
            } finally {
              setIsProcessingPayment(false);
            }
          },
          config: {
            display: {
              blocks: {
                utib: {
                  name: 'UPI Apps (Recommended)',
                  instruments: [
                    {
                      method: 'upi',
                      flows: ['collect', 'intent']
                    }
                  ]
                },
                wallet: {
                  name: 'Digital Wallets',
                  instruments: [
                    {
                      method: 'wallet',
                      wallets: [
                        'paytm', 'mobikwik', 'amazonpay', 'freecharge', 
                        'jiomoney', 'airtel_money'
                      ]
                    }
                  ]
                },
                card: {
                  name: 'Credit/Debit Cards',
                  instruments: [
                    {
                      method: 'card'
                    }
                  ]
                },
                banks: {
                  name: 'Net Banking',
                  instruments: [
                    {
                      method: 'netbanking'
                    }
                  ]
                }
              },
              sequence: ['block.utib', 'block.wallet', 'block.card', 'block.banks'],
              preferences: {
                show_default_blocks: true
              }
            }
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
            emi: false,
            paylater: false
          },
          prefill: {
            name: 'Customer',
            email: 'customer@foodweb.com',
            contact: '9999999999'
          },
          theme: {
            color: '#f97316',
            backdrop_color: 'rgba(0,0,0,0.6)'
          },
          modal: {
            ondismiss: function() {
              setIsProcessingPayment(false);
              console.log('Payment cancelled by user');
            },
            escape: true,
            animation: true
          },
          retry: {
            enabled: true,
            max_count: 3
          }
        };

        // Check if Razorpay is loaded
        if (typeof window.Razorpay === 'undefined') {
          throw new Error('Razorpay SDK not loaded. Please refresh the page.');
        }

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
          setPaymentError(`Payment failed: ${response.error.description || 'Unknown error'}`);
          console.error('Payment failed:', response.error);
          setIsProcessingPayment(false);
        });

        rzp.open();
        
      } catch (error) {
        if (error.message.includes('Authentication') || error.message.includes('authorization denied')) {
          setPaymentError('Session expired. Please login again to continue.');
        } else if (error.message.includes('Payment gateway not configured')) {
          setPaymentError('Payment system is currently unavailable. Please try again later.');
        } else {
          setPaymentError('Failed to initiate payment. Please check your internet connection and try again.');
        }
        console.error('Payment initiation error:', error);
        setIsProcessingPayment(false);
      }
    } else {
      // Cash on delivery
      dispatch(clearCart());
      alert('✅ Order placed successfully! Pay on delivery.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center text-gray-600">
        <FaShoppingBag size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl mb-2 text-gray-800">Your cart is empty</h2>
        <p className="text-sm">Add some delicious items to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-5">
      <div className="flex justify-between items-center mb-5 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3 relative">
          <h1 className="m-0 text-gray-800 text-2xl font-bold">Your Cart</h1>
          <span className="bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded-xl min-w-6 text-center">{cartItems.length}</span>
        </div>
        <button className="bg-none border-none text-red-500 cursor-pointer flex items-center gap-2 text-sm hover:text-red-600 transition-colors duration-200" onClick={handleClearCart}>
          <FaTrash /> Clear Cart
        </button>
      </div>

      <div className="mb-5">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border-b border-gray-200">
            <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="m-0 mb-2 text-base font-medium">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="font-semibold text-gray-800">₹{item.price}</div>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-2xl">
              <button className="bg-none border-none text-orange-500 cursor-pointer text-sm hover:text-orange-600" onClick={() => handleQuantityChange(item.id, -1)}>
                <FaMinus />
              </button>
              <span className="font-semibold min-w-8 text-center">{item.quantity}</span>
              <button className="bg-none border-none text-orange-500 cursor-pointer text-sm hover:text-orange-600" onClick={() => handleQuantityChange(item.id, 1)}>
                <FaPlus />
              </button>
            </div>
            <div className="font-semibold text-gray-800 text-lg min-w-20 text-right">
              ₹{item.price * item.quantity}
            </div>
            <button 
              className="bg-none border-none text-gray-600 cursor-pointer text-sm px-2 py-1 rounded transition-colors duration-200 hover:text-red-500"
              onClick={() => handleRemoveItem(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="flex justify-between mb-3 text-sm">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mb-3 text-sm">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="mt-5">
          <h3 className="mb-3 text-base font-medium">Select Payment Method</h3>
          <div className="space-y-3 mb-5">
            <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-orange-500"
                disabled={isProcessingPayment}
              />
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-blue-500" />
                <div>
                  <div className="font-medium">Pay Online</div>
                  <div className="text-sm text-gray-500">UPI, Cards, Net Banking, Wallets</div>
                  <div className="text-xs text-gray-400 mt-1">
                    💳 Google Pay • PhonePe • Paytm • Amazon Pay • Cards & More
                  </div>
                </div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-orange-500"
                disabled={isProcessingPayment}
              />
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" />
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-500">Pay when your order arrives</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {paymentError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {paymentError}
          </div>
        )}

        <button 
          className="w-full bg-orange-500 text-white border-none px-4 py-4 rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isProcessingPayment}
        >
          {isProcessingPayment 
            ? 'Processing...' 
            : paymentMethod === 'razorpay' 
              ? '💳 Pay Now' 
              : '📦 Place Order'
          }
        </button>
      </div>
    </div>
  );
};

export default Cart;
