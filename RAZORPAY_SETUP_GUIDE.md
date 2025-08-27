# FoodWeb Razorpay Payment Integration Setup Guide

## 🚀 Complete Payment Integration with UPI Support

Your FoodWeb application now has complete Razorpay payment integration with support for:
- ✅ UPI Apps (Google Pay, PhonePe, Paytm)
- ✅ Digital Wallets (Amazon Pay, Mobikwik, etc.)
- ✅ Credit/Debit Cards
- ✅ Net Banking
- ✅ Cash on Delivery

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at https://dashboard.razorpay.com/
2. **MongoDB Database**: Your MongoDB Atlas connection is already configured
3. **Node.js**: Ensure you have Node.js installed

## 🔑 Step 1: Get Razorpay API Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or login to your account
3. Navigate to **Settings** → **API Keys**
4. Click **Generate Test Keys** (for development)
5. Copy the **Key ID** (starts with `rzp_test_`)
6. Copy the **Key Secret**

## ⚙️ Step 2: Configure Environment Variables

### Backend Configuration (.env file in backend folder)
Replace the placeholder values in `backend/.env`:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_FROM_DASHBOARD
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_FROM_DASHBOARD
```

### Frontend Configuration (.env file in root folder)
Replace the placeholder value in `.env`:

```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_FROM_DASHBOARD
```

## 🚀 Step 3: Start the Application

### Terminal 1 - Start Backend Server:
```bash
cd backend
npm start
```
Expected output:
```
🚀 Server started on port 4000
MongoDB Connected...
```

### Terminal 2 - Start Frontend:
```bash
# In root directory (FoodWeb folder)
npm start
```
Expected output:
```
Server running at http://localhost:1234
```

## 🧪 Step 4: Test the Payment Integration

### Test Payment Flow:
1. **Open Application**: Go to http://localhost:1234
2. **Login/Register**: Create an account or login
3. **Add Items**: Add food items to your cart
4. **Go to Cart**: Navigate to cart page
5. **Select Payment**: Choose "Pay Online" option
6. **Click Pay Now**: This will open Razorpay checkout

### Test Payment Credentials (Razorpay Test Mode):

**UPI Testing:**
- UPI ID: `success@razorpay`

**Card Testing:**
- Card Number: `4111 1111 1111 1111`
- Expiry Date: `12/25` (any future date)
- CVV: `123`
- Name: Any name

**Other Test Cards:**
- Visa: `4111 1111 1111 1111`
- Mastercard: `5555 5555 5555 4444`
- American Express: `3782 8224 6310 005`

## 🔒 Security Features Implemented

1. **Authentication Required**: Payment endpoints require user login
2. **Server-side Verification**: Payment signatures verified on backend
3. **Database Tracking**: All payments tracked with status (pending/completed/failed)
4. **Error Handling**: Comprehensive error handling with user feedback
5. **Environment Variables**: Sensitive keys stored securely

## 🎯 Payment Options Available

### UPI Apps (Recommended for Indian Users):
- Google Pay
- PhonePe
- Paytm
- BHIM UPI
- Any UPI-enabled app

### Digital Wallets:
- Paytm Wallet
- Amazon Pay
- Mobikwik
- Freecharge
- Jio Money
- Airtel Money

### Traditional Methods:
- Credit Cards (Visa, Mastercard, AmEx)
- Debit Cards
- Net Banking (all major banks)

### Alternative:
- Cash on Delivery

## 🐛 Common Issues & Solutions

### Issue: "No token, authorization denied"
**Solution**: User must be logged in before attempting payment

### Issue: "Payment gateway not configured"
**Solution**: Ensure Razorpay API keys are properly set in environment variables

### Issue: "Razorpay SDK not loaded"
**Solution**: Check if the Razorpay script is loaded in index.html:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Issue: 401 Unauthorized from Razorpay
**Solution**: Replace placeholder API keys with actual keys from Razorpay dashboard

### Issue: MongoDB connection failed
**Solution**: Your MongoDB Atlas connection is configured, ensure internet connectivity

## 📱 Mobile UPI Integration

The integration is optimized for mobile UPI payments:
- **Intent Flow**: Direct app opening (Google Pay, PhonePe, etc.)
- **Collect Flow**: QR code scanning
- **Mobile Responsive**: Works seamlessly on mobile devices

## 🏗️ Architecture Overview

```
Frontend (React) 
    ↓ (Authentication Token)
Backend API (/api/payment/order)
    ↓ (Create Order)
Razorpay Server
    ↓ (Payment Processing)
Frontend (Razorpay Checkout)
    ↓ (Payment Success)
Backend API (/api/payment/verify)
    ↓ (Signature Verification)
Database (Payment Record Updated)
```

## 🎉 You're All Set!

Once you've configured the API keys and started both servers, your FoodWeb application will have:

- 🛒 Complete shopping cart functionality
- 🔐 User authentication and authorization
- 💳 Multiple payment options with UPI priority
- 📱 Mobile-optimized payment experience
- 🔒 Secure payment processing with signature verification
- 📊 Payment tracking and order management
- 🚚 Cash on delivery option

Your customers can now pay using their preferred method, with special emphasis on popular Indian payment apps like Google Pay, PhonePe, and Paytm!

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify API keys are correctly configured
3. Ensure both servers are running
4. Test with the provided test credentials

Happy coding! 🚀