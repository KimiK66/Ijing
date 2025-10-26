#!/bin/bash

# Script to add Google OAuth credentials to Vercel
# Run this after you get your Google OAuth credentials from Google Cloud Console

echo "Adding Google OAuth credentials to Vercel..."
echo ""

# Add GOOGLE_CLIENT_ID
echo "Please enter your Google Client ID:"
read -p "GOOGLE_CLIENT_ID: " GOOGLE_CLIENT_ID
npx vercel env add GOOGLE_CLIENT_ID production

# Add GOOGLE_CLIENT_SECRET  
echo "Please enter your Google Client Secret:"
read -p "GOOGLE_CLIENT_SECRET: " GOOGLE_CLIENT_SECRET
npx vercel env add GOOGLE_CLIENT_SECRET production

echo ""
echo "✅ Google OAuth credentials added to Vercel!"
echo ""
echo "Next steps:"
echo "1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/bgwbsfbyxjhformmuxyd"
echo "2. Navigate to Authentication > Providers"
echo "3. Enable Google provider and enter the same credentials"
echo "4. Redeploy your application"
echo ""
echo "To redeploy: npx vercel --prod"
