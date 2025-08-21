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
          <div className="flex gap-4 mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-orange-500"
              />
              <FaCreditCard className="text-blue-500" />
              <span>Pay Online</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-orange-500"
              />
              <FaMoneyBillWave className="text-green-500" />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button 
          className="w-full bg-orange-500 text-white border-none px-4 py-4 rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-orange-600"
          onClick={handleCheckout}
        >
          {paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
