# Portfolio Contact Form Backend

A Node.js/Express backend for handling contact form submissions with MongoDB persistence and email functionality.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Resend

Create a Resend account, generate an API key, and decide which address you want to send from:

1. Sign in at [resend.com](https://resend.com)
2. Create an API key from the Resend dashboard
3. For quick testing, you can use `onboarding@resend.dev`
4. For production, verify your domain in Resend and use a sender like `contact@yourdomain.com`

### 3. Create `.env` File

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Resend credentials and MongoDB connection string:

```
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=contact@yourdomain.com
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
PORT=5000
```

### 4. Start the Server

**Development mode** (with auto-restart):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET `/api/health`
Health check endpoint to verify the server is running and whether MongoDB is connected.

**Response:**
```json
{
  "status": "OK",
  "database": "connected",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message saved and email sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error description"
}
```

## Frontend Integration

The frontend should send requests to:
```
POST http://localhost:5000/api/contact
```

Or if deployed:
```
POST https://your-backend-url.com/api/contact
```

## Deployment Options

### Render.com (Free tier available)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set the Root Directory to `backend`
4. Use `npm install` as the build command
5. Use `npm start` as the start command
6. Set environment variables
7. Set the health check path to `/api/health`
8. Deploy

Required Render environment variables:

```
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=contact@yourdomain.com
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

If your frontend has both a production domain and a preview domain, you can set:

```
FRONTEND_URL=https://your-frontend-domain.com,https://your-preview-domain.vercel.app
```

Important for production:
- Verify your sending domain in Resend before going live
- Add your Render outbound access in MongoDB Atlas Network Access
- Update your frontend `VITE_BACKEND_URL` to your Render backend URL
- Redeploy the frontend after changing that variable

### Railway.app
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Heroku
1. Create `Procfile` with: `web: npm start`
2. Deploy using `heroku create` and `git push heroku main`

## Troubleshooting

### "Invalid login"
- Check that `RESEND_API_KEY` is valid
- Make sure `RESEND_FROM_EMAIL` is allowed by your Resend account
- If you're in production, verify your sending domain in Resend

### CORS errors
- Check that frontend is making requests to the correct backend URL
- Make sure `FRONTEND_URL` includes your deployed frontend domain

### Email not sending
- Check server logs for error messages
- Verify environment variables are set correctly
- Confirm `RECIPIENT_EMAIL` is the inbox that should receive contact submissions
- Test with `GET /api/health` first to ensure server is running

### MongoDB not connecting
- Check that `MONGODB_URI` is correct
- If using local MongoDB, make sure MongoDB is running on port `27017`
- If using MongoDB Atlas, allow your IP address in Atlas Network Access
- Check `GET /api/health` and confirm `"database": "connected"`

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Validate all inputs (already implemented)
- Implement rate limiting for production
