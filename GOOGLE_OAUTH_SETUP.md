# Google OAuth Setup Guide for Supabase

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
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
     - `https://ijing.vercel.app` (if you have a custom domain)
   - **Authorized redirect URIs**:
     - `https://bgwbsfbyxjhformmuxyd.supabase.co/auth/v1/callback`
   - Copy the **Client ID** and **Client Secret**

## Step 2: Supabase Configuration

1. **Go to your Supabase project**: https://supabase.com/dashboard/project/bgwbsfbyxjhformmuxyd
2. **Navigate to Authentication** > **Providers**
3. **Enable Google Provider**:
   - Toggle "Enable sign in with Google"
   - Enter your Google **Client ID**
   - Enter your Google **Client Secret**
   - Click "Save"

## Step 3: Vercel Environment Variables

Add these environment variables to your Vercel project:

```bash
# Add these to Vercel environment variables
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

To add them via Vercel CLI:
```bash
npx vercel env add GOOGLE_CLIENT_ID
npx vercel env add GOOGLE_CLIENT_SECRET
```

## Step 4: Update Your Application

The current authentication setup should work once the above steps are completed. The code is already properly configured to:
- Redirect to Google OAuth
- Handle the callback
- Store user sessions
- Allow individual user accounts

## Step 5: Test the Flow

1. Deploy the updated environment variables
2. Visit your production site
3. Click "Sign In"
4. You should be redirected to Google OAuth
5. After authentication, you should be redirected back to your app
6. Each user will have their own account and can save their readings/journals

## Important Notes

- **Each user will have their own Google account** - no more shared accounts
- **User data is isolated** - each user's readings and journals are private
- **Production URLs must be added** to Google Cloud Console authorized origins
- **Supabase handles the OAuth flow** - no need for NextAuth.js

## Troubleshooting

If authentication still doesn't work:
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Ensure Google Cloud Console URLs match your production domain
4. Check Supabase logs in the dashboard
