const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes

// Configure Mongoose to suppress deprecation warnings
mongoose.set('strictQuery', false); // Prepare for Mongoose 7 default behavior

const result = dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Dotenv result:', result);
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

const app = express();

// Apply helmet for security headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: '10mb' })); // Adjust limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Adjust limit as needed

// CORS configuration for development and production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:1234',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes per IP
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Mount routes
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api/payment', paymentRoutes); // Payment integration removed
app.use('/api/orders', orderRoutes); // Mount order routes

// Simple route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Function to create self-signed certificate for development
const createSelfSignedCert = () => {
  const sslDir = path.join(__dirname, 'ssl');
  const certPath = path.join(sslDir, 'cert.pem');
  const keyPath = path.join(sslDir, 'key.pem');
  
  // Create ssl directory if it doesn't exist
  if (!fs.existsSync(sslDir)) {
    fs.mkdirSync(sslDir, { recursive: true });
  }
  
  // Check if certificates already exist
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    return { cert: certPath, key: keyPath };
  }
  
  // Generate self-signed certificate for development
  const { execSync } = require('child_process');
  try {
    // Generate private key
    execSync(`openssl genrsa -out "${keyPath}" 2048`, { stdio: 'inherit' });
    
    // Generate certificate with SAN for localhost
    const subj = '/C=US/ST=State/L=City/O=FoodWeb/CN=localhost';
    const san = 'subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1';
    execSync(`openssl req -new -x509 -key "${keyPath}" -out "${certPath}" -days 365 -subj "${subj}" -extensions SAN -config <(echo '[SAN]'; echo '${san}')`, { 
      stdio: 'inherit',
      shell: true 
    });
    
    console.log('✅ Self-signed SSL certificates generated for development');
    console.log('🔧 To avoid browser warnings, add the certificate to your trusted root store');
    console.log(`📄 Certificate location: ${certPath}`);
    return { cert: certPath, key: keyPath };
  } catch (error) {
    console.log('⚠️  OpenSSL not found or certificate generation failed.');
    console.log('📝 For HTTPS in development, install OpenSSL and restart the server.');
    console.log('💡 Alternatively, use HTTP for development (set ENABLE_HTTPS=false)');
    return null;
  }
};

connectDB();

const PORT = process.env.PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4001;
const ENABLE_HTTPS = process.env.ENABLE_HTTPS === 'true';

// Start HTTP server (fallback)
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 HTTP Server started on port ${PORT}`);
  console.log(`📱 Access at: http://localhost:${PORT}`);
});

// Start HTTPS server if enabled
if (ENABLE_HTTPS) {
  const sslConfig = createSelfSignedCert();
  
  if (sslConfig) {
    try {
      const httpsOptions = {
        key: fs.readFileSync(sslConfig.key),
        cert: fs.readFileSync(sslConfig.cert)
      };
      const httpsServer = https.createServer(httpsOptions, app);
      httpsServer.listen(HTTPS_PORT, () => {
        console.log(`🔒 HTTPS Server started on port ${HTTPS_PORT}`);
        console.log(`🌐 Access at: https://localhost:${HTTPS_PORT}`);
        console.log(`✅ SSL/TLS encryption enabled`);
        console.log(`🛡️  Razorpay HTTPS compliance: READY`);
        console.log(`⚠️  Browser Warning: Click "Advanced" -> "Proceed to localhost" to bypass self-signed certificate warning`);
      });
      httpsServer.on('error', (err) => {
        console.error('❌ HTTPS Server Error:', err.message);
        if (err.code === 'EADDRINUSE') {
          console.log(`🚫 Port ${HTTPS_PORT} is already in use. Try a different port or stop the existing process.`);
        }
      });
    } catch (error) {
      console.error('❌ Failed to start HTTPS server:', error.message);
      console.log('🔄 Falling back to HTTP server only');
    }
  }
} else {
  console.log('ℹ️  HTTPS is disabled. Set ENABLE_HTTPS=true in .env to enable.');
  console.log('📝 For development, HTTP is recommended to avoid certificate warnings.');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  httpServer.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
}); 