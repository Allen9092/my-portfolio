import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Resend } from 'resend';

import ContactSubmission from './models/ContactSubmission.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;
const FRONTEND_URL = process.env.FRONTEND_URL || '';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const isEmailConfigured = Boolean(RESEND_API_KEY && RESEND_FROM_EMAIL && RECIPIENT_EMAIL);
const allowedOrigins = FRONTEND_URL
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed'));
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
} else {
  console.warn('MONGODB_URI is not set. Contact submissions will not be stored.');
}

if (!isEmailConfigured) {
  console.warn(
    'Resend email is not fully configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and RECIPIENT_EMAIL.'
  );
}

if (allowedOrigins.length > 0) {
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
} else {
  console.warn('FRONTEND_URL is not set. CORS will allow requests from any origin.');
}

function isResendTestingRestriction(errorMessage = '') {
  return errorMessage.includes('You can only send testing emails to your own email address');
}

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.post('/api/contact', async (req, res) => {
  let submission;

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all fields',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    if (!MONGODB_URI || mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        error: 'Database is not connected. Please try again later.',
      });
    }

    if (!isEmailConfigured || !resend) {
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured. Please try again later.',
      });
    }

    submission = await ContactSubmission.create({
      name,
      email,
      message,
    });

    const ownerEmail = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    if (ownerEmail.error) {
      throw new Error(ownerEmail.error.message || 'Failed to send notification email.');
    }

    const replyEmail = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You!</h2>
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Allen</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Your original message:</p>
          <p style="color: #999; font-size: 12px; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">
            ${escapeHtml(message).replace(/\n/g, '<br>')}
          </p>
        </div>
      `,
    });

    const replyErrorMessage = replyEmail?.error?.message || '';
    if (replyEmail.error && !isResendTestingRestriction(replyErrorMessage)) {
      throw new Error(replyErrorMessage || 'Failed to send reply email.');
    }

    submission.emailStatus = replyEmail.error ? 'partial' : 'sent';
    submission.emailError = replyEmail.error
      ? 'Contact message delivered, but auto-reply was skipped because the Resend sender is still in testing mode.'
      : '';
    await submission.save();

    res.status(200).json({
      success: true,
      message: 'Message saved and email sent successfully!',
      autoReplySent: !replyEmail.error,
    });
  } catch (error) {
    console.error('Contact submission error:', error);

    if (submission) {
      submission.emailStatus = 'failed';
      submission.emailError = error.message || 'Unknown email error';

      try {
        await submission.save();
      } catch (saveError) {
        console.error('Failed to update submission email status:', saveError);
      }
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid contact submission data.',
      });
    }

    if (error.name === 'MongoServerSelectionError') {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed. Please try again later.',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to save message or send email. Please try again later.',
    });
  }
});

app.get('/api/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const database =
    dbState === 1 ? 'connected' :
    dbState === 2 ? 'connecting' :
    dbState === 3 ? 'disconnecting' :
    'disconnected';

  res.json({
    status: 'OK',
    database,
    emailService: isEmailConfigured ? 'configured' : 'missing',
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/health - Health check');
  console.log('  POST /api/contact - Submit contact form');
});

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return String(text).replace(/[&<>"']/g, (match) => map[match]);
}
