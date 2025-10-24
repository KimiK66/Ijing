# Vercel Deployment Guide for I Ching Divination App

This guide will help you deploy the I Ching Divination webapp to Vercel with full Supabase and ElevenLabs integration.

## Prerequisites

Before deploying, you'll need:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
3. **ElevenLabs Account**: Sign up at [elevenlabs.io](https://elevenlabs.io)

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

### 1.2 Create Database Tables
Run the SQL commands from `supabase-setup-final.sql` in your Supabase SQL editor:

```sql
-- Create hexagrams table
CREATE TABLE hexagrams (
  id TEXT PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL,
  name JSONB NOT NULL,
  chinese_name TEXT NOT NULL,
  upper_trigram TEXT NOT NULL,
  lower_trigram TEXT NOT NULL,
  judgement JSONB NOT NULL,
  image JSONB NOT NULL,
  lines JSONB NOT NULL,
  interpretation JSONB NOT NULL,
  keywords JSONB NOT NULL,
  element TEXT NOT NULL,
  season TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_readings table
CREATE TABLE user_readings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES auth.users(id),
  hexagram_id TEXT NOT NULL REFERENCES hexagrams(id),
  question TEXT,
  context TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_journals table
CREATE TABLE user_journals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES auth.users(id),
  reading_id TEXT REFERENCES user_readings(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own readings" ON user_readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings" ON user_readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings" ON user_readings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own readings" ON user_readings
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own journals" ON user_journals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journals" ON user_journals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals" ON user_journals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals" ON user_journals
  FOR DELETE USING (auth.uid() = user_id);
```

### 1.3 Configure Authentication
1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google and GitHub OAuth providers
3. Add your domain to the allowed origins

## Step 2: Set Up ElevenLabs

### 2.1 Get API Key
1. Go to [elevenlabs.io](https://elevenlabs.io) and sign up
2. Navigate to your profile settings
3. Copy your API key

### 2.2 Voice Configuration
The app is pre-configured with multilingual voices:
- **English**: Adam (pNInz6obpgDQGcFmaJgB)
- **Chinese**: Bella (EXAVITQu4vr4xnSDxMaL) 
- **Hindi**: Josh (VR6AewLTigWG4xSOukaG)
- **Spanish**: Josh (TxGEqnHWrfWFTfGW9XjX)
- **French**: Josh (VR6AewLTigWG4xSOukaG)
- **Japanese**: Domi (AZnzlk1XvdvUeBnXmlld)

## Step 3: Deploy to Vercel

### 3.1 Connect Repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the I Ching Divination project

### 3.2 Configure Environment Variables
In your Vercel project settings, add these environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Next.js Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_random_secret_string

# Production URL
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### 3.3 Deploy
1. Click "Deploy" in Vercel
2. Wait for the deployment to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## Step 4: Populate Database

### 4.1 Install Dependencies
```bash
npm install tsx dotenv
```

### 4.2 Create Environment File
Create a `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4.3 Run Database Population Script
```bash
npm run populate-db
```

This will populate your Supabase database with all 64 hexagrams.

## Step 5: Test Your Deployment

### 5.1 Test Core Features
1. **Homepage**: Visit your Vercel URL
2. **Hexagrams**: Browse all 64 hexagrams
3. **Random Draw**: Test the random hexagram feature
4. **Audio**: Test text-to-speech in different languages
5. **Authentication**: Test Google/GitHub login

### 5.2 Test Multi-Language Support
1. Switch between different languages
2. Verify translations are working
3. Test audio generation in each language

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## Troubleshooting

### Common Issues

1. **Audio Not Working**
   - Check ElevenLabs API key is correct
   - Verify API key has sufficient credits
   - Check browser console for errors

2. **Database Connection Issues**
   - Verify Supabase URL and keys are correct
   - Check if RLS policies are properly configured
   - Ensure database tables exist

3. **Authentication Issues**
   - Verify OAuth providers are enabled in Supabase
   - Check allowed origins include your Vercel domain
   - Ensure redirect URLs are configured

4. **Build Errors**
   - Check all environment variables are set
   - Verify all dependencies are installed
   - Check TypeScript compilation errors

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `ELEVENLABS_API_KEY`
- [ ] `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL`

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Check the browser console for errors
3. Verify all environment variables are set correctly
4. Ensure all services (Supabase, ElevenLabs) are properly configured

## Features Available After Deployment

✅ **Multi-language hexagram browsing** (6 languages)
✅ **Random hexagram drawing**
✅ **Text-to-speech in all languages**
✅ **User authentication** (Google, GitHub)
✅ **Personal reading journals**
✅ **Responsive design**
✅ **Voice narration with ElevenLabs**
✅ **Database persistence with Supabase**

Your I Ching Divination app is now live and ready for users worldwide! 🌟
