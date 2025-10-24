# Deployment Guide

This guide will help you deploy the I Ching Divination Webapp to Vercel with Supabase and ElevenLabs integration.

## Prerequisites

- GitHub account
- Vercel account
- Supabase account
- ElevenLabs account

## Step 1: Set up Supabase

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Set up the database**:
   - Go to the SQL Editor in your Supabase dashboard
   - Run the SQL script from `supabase-setup.sql`
   - This will create the necessary tables and policies

3. **Configure OAuth providers**:
   - Go to Authentication > Providers in your Supabase dashboard
   - Enable Google OAuth:
     - Create a Google OAuth app in Google Cloud Console
     - Add your Supabase callback URL
     - Copy the client ID and secret to Supabase
   - Enable GitHub OAuth:
     - Create a GitHub OAuth app
     - Add your Supabase callback URL
     - Copy the client ID and secret to Supabase

## Step 2: Set up ElevenLabs

1. **Create an ElevenLabs account**:
   - Go to [elevenlabs.io](https://elevenlabs.io)
   - Sign up for an account
   - Get your API key from the profile section

## Step 3: Deploy to Vercel

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure environment variables**:
   In your Vercel dashboard, go to Settings > Environment Variables and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your_random_secret_string
   ```

4. **Deploy**:
   - Click "Deploy" in Vercel
   - Wait for the deployment to complete
   - Your app will be available at `https://your-app-name.vercel.app`

## Step 4: Configure OAuth Callbacks

1. **Update Supabase OAuth settings**:
   - In your Supabase dashboard, go to Authentication > URL Configuration
   - Add your Vercel domain to the allowed redirect URLs:
     ```
     https://your-app-name.vercel.app/auth/callback
     ```

2. **Update Google OAuth**:
   - In Google Cloud Console, add your Vercel domain to authorized redirect URIs

3. **Update GitHub OAuth**:
   - In GitHub OAuth app settings, add your Vercel domain to callback URLs

## Step 5: Seed the Database (Optional)

If you want to populate the database with all 64 hexagrams:

1. **Create a seed script**:
   ```javascript
   // scripts/seed-hexagrams.js
   const { createClient } = require('@supabase/supabase-js')
   const fs = require('fs')
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY
   )
   
   const hexagrams = JSON.parse(fs.readFileSync('./src/data/complete-hexagrams.json', 'utf8'))
   
   async function seed() {
     for (const hexagram of hexagrams) {
       const { error } = await supabase
         .from('hexagrams')
         .upsert(hexagram)
       
       if (error) {
         console.error('Error seeding hexagram:', hexagram.number, error)
       } else {
         console.log('Seeded hexagram:', hexagram.number)
       }
     }
   }
   
   seed()
   ```

2. **Run the seed script**:
   ```bash
   node scripts/seed-hexagrams.js
   ```

## Troubleshooting

### Common Issues

1. **OAuth not working**:
   - Check that callback URLs are correctly configured
   - Ensure environment variables are set correctly
   - Check browser console for errors

2. **ElevenLabs API errors**:
   - Verify your API key is correct
   - Check your ElevenLabs account has sufficient credits
   - Ensure the API key has the correct permissions

3. **Database connection issues**:
   - Verify Supabase URL and keys are correct
   - Check that RLS policies are properly configured
   - Ensure tables exist in your database

### Environment Variables Checklist

Make sure all these environment variables are set in Vercel:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `ELEVENLABS_API_KEY`
- [ ] `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET`

### Testing the Deployment

1. **Test basic functionality**:
   - Visit your deployed app
   - Try browsing hexagrams
   - Test the random draw feature

2. **Test authentication**:
   - Try logging in with Google/GitHub
   - Check that user data is saved correctly

3. **Test voice features**:
   - Try playing audio for different hexagrams
   - Test with different languages

## Production Considerations

1. **Security**:
   - Use strong, unique secrets for NEXTAUTH_SECRET
   - Regularly rotate your API keys
   - Monitor your Supabase usage and costs

2. **Performance**:
   - Enable caching for static assets
   - Monitor your ElevenLabs API usage
   - Consider implementing audio caching

3. **Monitoring**:
   - Set up error tracking (e.g., Sentry)
   - Monitor API response times
   - Track user engagement metrics

## Support

If you encounter any issues during deployment:

1. Check the Vercel deployment logs
2. Review the browser console for client-side errors
3. Check your Supabase logs for database issues
4. Verify all environment variables are correctly set

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [ElevenLabs Documentation](https://elevenlabs.io/docs)
