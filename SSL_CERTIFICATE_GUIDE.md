# SSL Certificate Solutions for "Your connection isn't private" Error

## Quick Fix: Use HTTP for Development (Recommended)

The application is now configured to use HTTP by default for development to avoid certificate issues.

### Current Configuration:
- **Frontend**: http://localhost:1234
- **Backend**: http://localhost:4000
- **HTTPS**: Disabled for development

### To run the application:

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   npm start
   ```

## Alternative: Enable HTTPS for Development

If you need HTTPS for development (e.g., for payment gateway testing):

### Option 1: Accept Self-Signed Certificate (Quick)

1. Set `ENABLE_HTTPS=true` in `backend/.env`
2. Use `npm run start-https` for frontend
3. When browser shows "Your connection isn't private":
   - Click **"Advanced"**
   - Click **"Proceed to localhost (unsafe)"**

### Option 2: Trust Self-Signed Certificate (Permanent)

#### Windows:
1. Navigate to `backend/ssl/cert.pem`
2. Double-click the certificate file
3. Click "Install Certificate"
4. Choose "Local Machine" and click "Next"
5. Select "Place all certificates in the following store"
6. Click "Browse" and select "Trusted Root Certification Authorities"
7. Click "Next" and "Finish"

#### Chrome/Edge:
1. Go to `chrome://settings/certificates`
2. Click "Authorities" tab
3. Click "Import"
4. Select `backend/ssl/cert.pem`
5. Check "Trust this certificate for identifying websites"

### Option 3: Use Production SSL Certificate

For production deployment:

1. Obtain SSL certificate from Certificate Authority (Let's Encrypt, etc.)
2. Update `backend/.env`:
   ```
   ENABLE_HTTPS=true
   SSL_CERT_PATH=/path/to/your/certificate.crt
   SSL_KEY_PATH=/path/to/your/private.key
   ```

## Environment Configuration

### Development (HTTP):
```env
# Frontend .env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_WEBSITE_URL=http://localhost:1234

# Backend .env
ENABLE_HTTPS=false
```

### Development (HTTPS):
```env
# Frontend .env
REACT_APP_API_URL=https://localhost:4001/api
REACT_APP_WEBSITE_URL=https://localhost:1234

# Backend .env
ENABLE_HTTPS=true
```

### Production (HTTPS):
```env
# Frontend .env
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_WEBSITE_URL=https://yourdomain.com

# Backend .env
ENABLE_HTTPS=true
CORS_ORIGIN=https://yourdomain.com
```

## Payment Gateway Considerations

### Razorpay Requirements:
- **Development**: HTTP is acceptable for testing
- **Production**: HTTPS is mandatory
- **Webhook URLs**: Must use HTTPS in production

### Testing Payments:
1. Use HTTP for local development
2. Use ngrok or similar for webhook testing:
   ```bash
   ngrok http 4000
   ```
3. Update Razorpay webhook URL to ngrok HTTPS URL

## Troubleshooting

### Port Conflicts:
- Frontend: Change port with `--port 1235`
- Backend: Change `PORT` in `.env`

### Certificate Issues:
- Delete `backend/ssl/` folder and restart server
- Check Windows Firewall/Antivirus
- Use HTTP mode for development

### CORS Errors:
- Ensure frontend and backend URLs match
- Check `CORS_ORIGIN` in backend `.env`
- Verify protocol (http/https) consistency