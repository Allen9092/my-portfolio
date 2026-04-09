#!/bin/bash

# Quick Setup Script for Portfolio Contact Form Backend
# Run this script from the root folder: bash setup.sh

echo "🚀 Setting up Portfolio Contact Form Backend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Setup backend
echo "📦 Installing backend dependencies..."
cd backend || exit 1
npm install

echo ""
echo "✅ Backend dependencies installed!"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your Resend credentials:"
    echo "   - RESEND_API_KEY: re_your_resend_api_key"
    echo "   - RESEND_FROM_EMAIL: onboarding@resend.dev"
    echo "   - RECIPIENT_EMAIL: your-email@gmail.com"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Edit backend/.env with your Resend credentials"
echo "   2. Run 'npm run dev' from the backend folder to start the backend server"
echo "   3. Run 'npm run dev' from the root folder to start the frontend"
echo "   4. Open http://localhost:5173 and test the contact form"
echo ""
echo "📖 For more details, see SETUP.md or backend/README.md"
echo ""
