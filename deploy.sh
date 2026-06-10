#!/bin/bash

# ORDO Frontend - Quick Deployment Script
# This script prepares the frontend for deployment

echo "🚀 ORDO Frontend Deployment Preparation"
echo "========================================"

# 1. Clean install
echo "📦 Cleaning dependencies..."
rm -rf node_modules package-lock.json
npm ci

# 2. Type check
echo "🔍 Running type check..."
npm run type-check

# 3. Build
echo "🔨 Building production bundle..."
npm run build

# 4. Check build output
echo "✅ Build complete! Checking output..."
if [ -d "dist" ]; then
    echo "✅ dist/ directory created"
    echo "📊 Bundle size:"
    du -sh dist/
    echo ""
    echo "📁 Files in dist/:"
    ls -lh dist/ | grep -v "^total" | awk '{print "   " $9 " (" $5 ")"}'
else
    echo "❌ ERROR: dist/ directory not found"
    exit 1
fi

echo ""
echo "✨ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - VITE_API_URL: https://your-backend-url.com"
echo ""
echo "2. Deploy with: vercel --prod"
echo ""
echo "Or test locally with: npm run preview"
