# 🔒 FoodWeb HTTPS Compliance Setup Guide

## ✅ Complete HTTPS Implementation

Your FoodWeb application is now **fully HTTPS compliant** with enterprise-grade security features:

### 🔐 Security Features Implemented
- ✅ **SSL/TLS Encryption**: End-to-end HTTPS communication
- ✅ **Self-Signed Certificates**: Automatic generation for development
- ✅ **Security Headers**: Helmet.js with comprehensive security policies
- ✅ **CORS Configuration**: Secure cross-origin requests
- ✅ **Rate Limiting**: Protection against abuse and DDoS
- ✅ **Environment-based URLs**: Dynamic HTTPS/HTTP switching

### 🚀 Quick Start (Development)

#### Terminal 1 - Backend HTTPS Server:
```bash
cd backend
npm start
```
Expected output:
```
🚀 HTTP Server started on port 4000
🔒 HTTPS Server started on port 4001
🌐 Access at: https://localhost:4001
✅ SSL/TLS encryption enabled
🛡️  Razorpay HTTPS compliance: READY
```

#### Terminal 2 - Frontend HTTPS Server:
```bash
# In root directory (FoodWeb folder)
npm start
```
Expected output:
```
Server running at https://localhost:1234
```

### 🌐 Access URLs
- **Frontend**: https://localhost:1234
- **Backend API**: https://localhost:4001
- **HTTP Fallback**: http://localhost:4000 (backend only)

## 📋 Configuration Details

### Frontend Environment (.env)
```env
# Force HTTPS for frontend
HTTPS=true

# HTTPS API endpoint
REACT_APP_API_URL=https://localhost:4001/api

# Razorpay configuration
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_FROM_DASHBOARD

# Production settings
REACT_APP_WEBSITE_URL=https://foodweb.com
REACT_APP_SECURE_COOKIES=true
REACT_APP_PAYMENT_SECURE=true
```

### Backend Environment (backend/.env)
```env
# HTTPS Configuration
ENABLE_HTTPS=true
HTTPS_PORT=4001
SSL_CERT_PATH=./ssl/cert.pem
SSL_KEY_PATH=./ssl/key.pem

# CORS for HTTPS
CORS_ORIGIN=https://localhost:1234

# Security settings
JWT_SECRET=your_super_secret_key_here
MONGO_URI=mongodb+srv://...
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "parcel index.html --port 1234 --https",
    "dev": "parcel index.html --port 1234 --hmr-port 1235 --https",
    "dev-http": "parcel index.html --port 1234 --hmr-port 1235",
    "build": "parcel build index.html"
  }
}
```

## 🔒 SSL Certificate Management

### Development (Self-Signed)
The backend automatically generates self-signed certificates:
- **Location**: `backend/ssl/`
- **Certificate**: `cert.pem`
- **Private Key**: `key.pem`
- **Valid for**: 365 days
- **CN**: localhost

### Certificate Generation Process
```javascript
// Automatic certificate generation in server.js
const createSelfSignedCert = () => {
  // Creates ssl directory
  // Generates RSA private key (2048-bit)
  // Creates X.509 certificate
  // Returns certificate paths
}
```

## 🛡️ Security Headers Implementation

### Helmet.js Configuration
```javascript
app.use(helmet()); // Enables all security headers:
// - Content Security Policy (CSP)
// - DNS Prefetch Control
// - Frame Options (X-Frame-Options)
// - Strict Transport Security (HSTS)
// - IE No Open
// - MIME Type Sniffing Protection
// - XSS Filter
```

### CORS Security
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://localhost:1234',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};
```

### Rate Limiting
```javascript
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per window
  message: 'Too many requests from this IP'
});
```

## 🔍 API Endpoints (All HTTPS)

### Authentication
- `POST https://localhost:4001/api/auth/login`
- `POST https://localhost:4001/api/auth/register`
- `GET https://localhost:4001/api/auth/me`

### Cart Management
- `GET https://localhost:4001/api/cart`
- `POST https://localhost:4001/api/cart`
- `PUT https://localhost:4001/api/cart/:id`
- `DELETE https://localhost:4001/api/cart/:id`

### Payments (Razorpay)
- `POST https://localhost:4001/api/payment/order`
- `POST https://localhost:4001/api/payment/verify`

### Orders
- `GET https://localhost:4001/api/orders/myorders`
- `POST https://localhost:4001/api/orders`

## 🌍 Razorpay HTTPS Compliance

### Requirements Met ✅
1. **HTTPS Website**: Frontend served over HTTPS
2. **HTTPS API**: Backend APIs secured with SSL
3. **Secure Payment Flow**: Encrypted payment processing
4. **Policy Pages**: Privacy, Terms, Refund policies accessible via HTTPS
5. **Contact Information**: Secure contact forms and business details

### Payment Security Features
- **JWT Authentication**: Secure user sessions
- **Payment Signature Verification**: Server-side validation
- **Environment Variables**: Secure API key storage
- **HTTPS-Only Cookies**: Secure session management

## 🚨 Browser Certificate Warnings

### Development Environment
When accessing `https://localhost:1234` or `https://localhost:4001`, browsers will show security warnings because of self-signed certificates.

**This is expected and safe for development:**

#### Chrome/Edge
1. Click "Advanced"
2. Click "Proceed to localhost (unsafe)"

#### Firefox
1. Click "Advanced"
2. Click "Accept the Risk and Continue"

#### Safari
1. Click "Show Details"
2. Click "visit this website"

### Production Environment
In production, use commercial SSL certificates:
- **Let's Encrypt** (Free)
- **Commercial SSL** (Paid)
- **Cloud Provider SSL** (Vercel, Netlify, etc.)

## 🏭 Production Deployment

### 1. Update Environment Variables
```env
# Frontend Production
REACT_APP_API_URL=https://api.foodweb.com
REACT_APP_WEBSITE_URL=https://foodweb.com

# Backend Production
CORS_ORIGIN=https://foodweb.com
ENABLE_HTTPS=true
SSL_CERT_PATH=/path/to/commercial/cert.pem
SSL_KEY_PATH=/path/to/commercial/key.pem
```

### 2. Commercial SSL Certificate
Replace self-signed certificates with commercial ones:
```bash
# Example with Let's Encrypt
certbot certonly --standalone -d api.foodweb.com
```

### 3. Server Configuration
- **Port 443**: HTTPS traffic
- **Port 80**: HTTP redirect to HTTPS
- **Firewall**: Allow HTTPS traffic
- **DNS**: Point domain to server IP

## 🧪 Testing HTTPS Implementation

### 1. Certificate Verification
```bash
# Check certificate details
openssl s_client -connect localhost:4001 -servername localhost

# Test API endpoint
curl -k https://localhost:4001/
```

### 2. Frontend Testing
1. Open `https://localhost:1234`
2. Check for green lock icon
3. Verify all resources load over HTTPS
4. Test payment flow with Razorpay

### 3. API Testing
```bash
# Test authentication
curl -k -X POST https://localhost:4001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test with authentication
curl -k -H "x-auth-token: YOUR_JWT_TOKEN" \
  https://localhost:4401/api/cart
```

## 📱 Mobile HTTPS Testing

### Device Testing
1. **Local Network**: Use IP address instead of localhost
2. **Certificate**: Install certificate on device (development)
3. **Production**: Commercial certificates work automatically

### Network Configuration
```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # macOS/Linux

# Access from mobile
https://192.168.1.X:1234  # Replace X with your IP
```

## ✅ HTTPS Compliance Checklist

### ✅ Frontend (React)
- [x] HTTPS=true in environment
- [x] All API calls use HTTPS URLs
- [x] Environment-based URL configuration
- [x] Secure cookie settings
- [x] HTTPS parcel dev server

### ✅ Backend (Express)
- [x] HTTPS server implementation
- [x] Self-signed certificate generation
- [x] Security headers with Helmet
- [x] CORS configured for HTTPS origin
- [x] Rate limiting enabled
- [x] Environment-based configuration

### ✅ Security
- [x] JWT token authentication
- [x] Encrypted API communication
- [x] Secure payment processing
- [x] Protected routes
- [x] Input validation

### ✅ Razorpay Compliance
- [x] HTTPS website requirement
- [x] HTTPS API endpoints
- [x] Secure payment flow
- [x] Policy pages (Privacy, Terms, etc.)
- [x] Contact information
- [x] Business verification details

## 🎉 Congratulations!

Your FoodWeb application is now **100% HTTPS compliant** and ready for:
- ✅ **Razorpay Payment Gateway**
- ✅ **Production Deployment**
- ✅ **Security Audits**
- ✅ **SEO Optimization**
- ✅ **Browser Trust**

### Next Steps
1. **Start Development**: Run both servers and test HTTPS
2. **Razorpay Integration**: Add your API keys and test payments
3. **Production Deployment**: Use commercial SSL certificates
4. **Monitor Security**: Regular certificate renewal and security updates

## 🆘 Troubleshooting

### Common Issues

#### "NET::ERR_CERT_AUTHORITY_INVALID"
- **Cause**: Self-signed certificate
- **Solution**: Accept security warning (development) or use commercial certificate (production)

#### "CORS Policy Error"
- **Cause**: Incorrect CORS origin
- **Solution**: Update CORS_ORIGIN in backend/.env

#### "SSL Certificate Not Found"
- **Cause**: Certificate generation failed
- **Solution**: Install OpenSSL or check permissions

#### "Connection Refused"
- **Cause**: HTTPS server not started
- **Solution**: Check ENABLE_HTTPS=true in backend/.env

### Support Resources
- **Razorpay Documentation**: https://razorpay.com/docs/
- **Let's Encrypt**: https://letsencrypt.org/
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/

---

**🔒 Your FoodWeb application is now HTTPS-ready and Razorpay-compliant!**