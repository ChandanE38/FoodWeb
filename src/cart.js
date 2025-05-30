import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from './cartSlice';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

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

  const handleCheckout = () => {
    if (paymentMethod === 'razorpay') {
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE',
        amount: total * 100,
        currency: 'INR',
        name: 'Food Delivery',
        description: 'Payment for your order',
        handler: function (response) {
          console.log(response);
          alert('Payment successful!');
          dispatch(clearCart());
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#e74c3c'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Order placed successfully! Pay on delivery.');
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingBag size={64} />
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <div className="cart-title">
          <h1>Your Cart</h1>
          <span className="cart-badge">{cartItems.length}</span>
        </div>
        <button className="clear-cart-btn" onClick={handleClearCart}>
          <FaTrash /> Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-description">{item.description}</p>
              <div className="cart-item-price">₹{item.price}</div>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => handleQuantityChange(item.id, -1)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                <FaPlus />
              </button>
            </div>
            <div className="cart-item-total">
              ₹{item.price * item.quantity}
            </div>
            <button 
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item.id)}
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
              />
              <FaMoneyBillWave />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button 
          className="checkout-btn"
          onClick={handleCheckout}
        >
          {paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
