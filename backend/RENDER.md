# Render Deployment

This backend is ready to deploy to Render as a Node web service.

## Render Settings

- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

You can either:
- create the service manually in the Render dashboard, or
- deploy from the root-level `render.yaml` blueprint in this repo

## Required Environment Variables

```env
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=contact@yourdomain.com
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

If you also want preview frontend deployments to call this backend, use a comma-separated list for `FRONTEND_URL`.

Example:

```env
FRONTEND_URL=https://your-frontend-domain.com,https://your-preview-domain.vercel.app
```

## Before Deploying

1. Verify your sending domain in Resend and replace the test sender.
2. In MongoDB Atlas, add the IP/network access required for Render.
3. Confirm your Atlas database user credentials are correct.
4. Set `VITE_BACKEND_URL` in your frontend project to your Render backend URL.

## After Deploying

1. Open `https://your-render-service.onrender.com/api/health`
2. Confirm:
   - `status` is `OK`
   - `database` is `connected`
   - `emailService` is `configured`
3. Submit the contact form from the deployed frontend
