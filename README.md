# I Ching Divination

A modern web application for exploring the ancient wisdom of the I Ching (Book of Changes) through interactive divination, personalized readings, and multi-language support.

**Live Demo:** https://ijing.vercel.app - Clean codebase deployed $(date)

## Features

- **Interactive Divination**: Browse all 64 hexagrams or draw a random hexagram for guidance
- **Multi-Language Support**: Access interpretations in English, Chinese, Hindi, Spanish, French, and Japanese
- **Voice Narration**: Listen to interpretations with natural voice synthesis powered by ElevenLabs
- **Personal Journals**: Save your readings and create personal reflections
- **User Authentication**: Secure login with Google and GitHub OAuth
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with social providers
- **Voice**: ElevenLabs Text-to-Speech API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- ElevenLabs account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KimiK66/Ijing.git
cd Ijing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

5. Set up Supabase:
   - Create a new Supabase project
   - Run the database migrations (see Database Setup section)
   - Configure OAuth providers (Google, GitHub)

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Supabase Tables

The application requires the following tables in your Supabase database:

#### hexagrams
```sql
CREATE TABLE hexagrams (
  id TEXT PRIMARY key,
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
```

#### user_readings
```sql
CREATE TABLE user_readings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES auth.users(id),
  hexagram_id TEXT NOT NULL REFERENCES hexagrams(id),
  question TEXT,
  context TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### user_journals
```sql
CREATE TABLE user_journals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES auth.users(id),
  reading_id TEXT REFERENCES user_readings(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

Enable RLS and create policies for user data:

```sql
-- Enable RLS
ALTER TABLE user_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_journals ENABLE ROW LEVEL SECURITY;

-- User readings policies
CREATE POLICY "Users can view their own readings" ON user_readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings" ON user_readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings" ON user_readings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own readings" ON user_readings
  FOR DELETE USING (auth.uid() = user_id);

-- User journals policies
CREATE POLICY "Users can view their own journals" ON user_journals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journals" ON user_journals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals" ON user_journals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals" ON user_journals
  FOR DELETE USING (auth.uid() = user_id);
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ELEVENLABS_API_KEY`
- `NEXTAUTH_URL` (your production domain)
- `NEXTAUTH_SECRET`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── hexagrams/         # Hexagram pages
│   ├── draw/              # Random draw page
│   ├── profile/           # User profile page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── data/                  # Static data files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- The I Ching (Book of Changes) - Ancient Chinese divination text
- Wilhelm/Baynes translation for the foundational interpretations
- ElevenLabs for voice synthesis capabilities
- Supabase for database and authentication services
- Vercel for hosting and deployment
