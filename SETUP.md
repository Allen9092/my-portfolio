# Portfolio - Email Integration Setup Guide

This guide will help you set up the contact form with MongoDB storage and email functionality.

## Project Structure

```
my-portfolio/
├── src/                 # Frontend (React)
│   └── components/
│       └── Contact.jsx  # Updated contact form
├── backend/             # Backend (Express)
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── package.json        # Frontend dependencies
```

## Setup Steps

### Step 1: Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create .env file (optional, for backend URL configuration)
echo "VITE_BACKEND_URL=http://localhost:5000" > .env
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install backend dependencies
npm install
```

### Step 3: Resend and MongoDB Configuration

Before running the backend, set up Resend:

1. **Create a Resend account and API key:**
   - Go to [resend.com](https://resend.com)
   - Open the API Keys section
   - Create a new API key and copy it

2. **Choose your sender address:**
   - For quick testing, use `onboarding@resend.dev`
   - For production, verify your domain in Resend and use a sender on that domain

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Set your MongoDB connection string**
   - Local MongoDB:
     `mongodb://127.0.0.1:27017/portfolio`
   - MongoDB Atlas:
     Use your Atlas connection string and replace `<password>` with your database user password

5. **Edit `backend/.env`:**
   ```
   RESEND_API_KEY=re_your_resend_api_key
   RESEND_FROM_EMAIL=onboarding@resend.dev
   RECIPIENT_EMAIL=your-email@gmail.com
   MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
   PORT=5000
   ```

### Step 4: Run the Application

**Terminal 1 - Backend (from `backend/` folder):**
```bash
npm run dev
# Output: Server is running on http://localhost:5000
```

**Terminal 2 - Frontend (from root folder):**
```bash
npm run dev
# Output: Local: http://localhost:5173
```

## Testing the Setup

1. Open `http://localhost:5173` in your browser
2. Scroll to the "Get In Touch" section
3. Fill out the contact form:
   - Name: Your Name
   - Email: Your Email
   - Message: Test message
4. Click "Send Message"
5. Visit `http://localhost:5000/api/health` and confirm `"database": "connected"`
6. You should see a success message
7. Check your email inbox for two emails:
   - One notification sent to `RECIPIENT_EMAIL`
   - One auto-reply sent to the sender's email address

## Backend API

The backend provides the following endpoint:

### POST `/api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message saved and email sent successfully!"
}
```

## Environment Variables Reference

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (backend/.env)
```
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=your-email@gmail.com
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
PORT=5000
```

## Production Deployment

### Frontend Deployment (Vercel, Netlify, GitHub Pages, etc.)

Update the environment variable before deployment:
```
VITE_BACKEND_URL=https://your-backend-url.com
```

### Backend Deployment Options

#### Option 1: Render.com (Recommended - Free tier)
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Create → Web Service
4. Connect your GitHub repository
5. Set environment variables in Render dashboard
6. Deploy

#### Option 2: Railway.app
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project
4. Connect GitHub repo (backend folder)
5. Add environment variables
6. Deploy

#### Option 3: Heroku
1. Create `Procfile` in backend:
   ```
   web: npm start
   ```
2. Deploy using Heroku CLI

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid login" or sender errors | Check that RESEND_API_KEY is valid and RESEND_FROM_EMAIL is allowed by Resend |
| "Connection refused" | Make sure backend is running and frontend has correct VITE_BACKEND_URL |
| Email not sending | Check that RESEND_API_KEY, RESEND_FROM_EMAIL, and RECIPIENT_EMAIL are correct in .env |
| MongoDB disconnected | Start local MongoDB or update MONGODB_URI to a valid Atlas/local connection string |
| CORS errors in browser | Backend has CORS enabled for all origins |
| Form shows "Something went wrong" | Check backend console for error messages |

## Security Best Practices

✅ **Do:**
- Add `.env` to `.gitignore` (already done)
- Use a Resend API key stored in environment variables
- Verify your sending domain before going to production
- Validate inputs on backend (already implemented)
- Keep dependencies updated: `npm update`

❌ **Don't:**
- Commit `.env` files to git
- Share your Resend API key
- Use the testing sender for production traffic
- Disable CORS validation in production

## File Modifications

### Files Changed:
- `src/components/Contact.jsx` - Updated to use backend API

### Files Created:
- `backend/server.js` - Express server with email functionality
- `backend/package.json` - Backend dependencies
- `backend/.env.example` - Environment variables template
- `backend/.gitignore` - Git ignore rules
- `backend/README.md` - Backend documentation

## Need Help?

Check the detailed documentation in `backend/README.md` for more information about:
- API endpoints
- Deployment options
- Advanced configuration
- Error handling

---

**Setup Complete!** Your portfolio contact form is now ready to send emails. 🎉
