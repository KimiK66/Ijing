# 🔐 Google OAuth Authentication Fix

## Current Status
✅ **Code is properly configured** - The authentication flow is correctly implemented
❌ **Google OAuth credentials missing** - This is why sign-in isn't working
❌ **Supabase OAuth not configured** - Need to enable Google provider in Supabase

## What You Need To Do

### Step 1: Get Google OAuth Credentials
1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create/Select Project**: Choose your project or create a new one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in required fields:
     - App name: "I Ching Oracle"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `email`, `profile`, `openid`
5. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: "I Ching Oracle Web Client"
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://ijing-1tle7ugcf-kimik66s-projects.vercel.app` (your current production URL)
   - **Authorized redirect URIs**:
     - `https://bgwbsfbyxjhformmuxyd.supabase.co/auth/v1/callback`
   - Copy the **Client ID** and **Client Secret**

### Step 2: Add Credentials to Vercel
Run the script I created:
```bash
./add-google-oauth.sh
```

Or manually add them:
```bash
npx vercel env add GOOGLE_CLIENT_ID production
npx vercel env add GOOGLE_CLIENT_SECRET production
```

### Step 3: Configure Supabase
1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/bgwbsfbyxjhformmuxyd
2. **Navigate to Authentication** > **Providers**
3. **Enable Google Provider**:
   - Toggle "Enable sign in with Google"
   - Enter your Google **Client ID**
   - Enter your Google **Client Secret**
   - Click "Save"

### Step 4: Deploy
```bash
npx vercel --prod
```

## What This Fixes

✅ **Individual User Accounts**: Each user will sign in with their own Google account
✅ **Private Data**: Each user's readings and journals will be private to them
✅ **No More Shared Accounts**: No more everyone using tancheaukim@gmail.com
✅ **Public Deployment**: Anyone can sign up and use the app

## Testing

After completing the setup:
1. Visit your production site
2. Click "Sign In"
3. You should be redirected to Google OAuth
4. After authentication, you'll be redirected back to your app
5. Each user will have their own account and can save their readings/journals

## Troubleshooting

If authentication still doesn't work:
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Ensure Google Cloud Console URLs match your production domain
4. Check Supabase logs in the dashboard
5. Make sure the redirect URI in Google Cloud Console matches: `https://bgwbsfbyxjhformmuxyd.supabase.co/auth/v1/callback`

## Important Notes

- **The code is already correct** - no changes needed to the application code
- **This is a configuration issue** - just need to set up the OAuth credentials
- **Each user gets their own account** - no more shared authentication
- **Data is isolated per user** - each user's readings and journals are private
