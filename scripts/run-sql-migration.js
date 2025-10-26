import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Running database migration...\n');
  
  try {
    // Add the new columns
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE hexagrams 
        ADD COLUMN IF NOT EXISTS detailed_guidance JSONB,
        ADD COLUMN IF NOT EXISTS personal_insights JSONB;
      `
    });
    
    if (error) {
      // If RPC doesn't work, try direct SQL via PostgREST
      console.log('Trying alternative method...');
      
      // Try using the raw query
      const migrationQuery = `
        ALTER TABLE hexagrams 
        ADD COLUMN IF NOT EXISTS detailed_guidance JSONB,
        ADD COLUMN IF NOT EXISTS personal_insights JSONB;
      `;
      
      // Use the REST API with the service role key to run SQL
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ query: migrationQuery })
      });
      
      if (!response.ok) {
        console.log('Attempting SQL execution through postgrest endpoint...');
        console.error('Error:', await response.text());
      }
    }
    
    console.log('✅ Migration attempted. Checking if columns exist...\n');
    
    // Check if columns were added by querying the schema
    const { data, error: queryError } = await supabase
      .from('hexagrams')
      .select('detailed_guidance, personal_insights')
      .limit(1);
      
    if (queryError) {
      console.log('❌ Columns do not exist yet.');
      console.log('📋 Please run this SQL in your Supabase dashboard:\n');
      console.log('─'.repeat(70));
      console.log('ALTER TABLE hexagrams');
      console.log('  ADD COLUMN IF NOT EXISTS detailed_guidance JSONB,');
      console.log('  ADD COLUMN IF NOT EXISTS personal_insights JSONB;');
      console.log('─'.repeat(70));
      console.log('\nAfter running the SQL, I will populate the data.');
    } else {
      console.log('✅ Columns exist! Proceeding to populate data...\n');
    }
    
  } catch (error) {
    console.error('❌ Error running migration:', error.message);
    console.log('\n📋 Please run this SQL manually in your Supabase dashboard:\n');
    console.log('─'.repeat(70));
    console.log('ALTER TABLE hexagrams');
    console.log('  ADD COLUMN IF NOT EXISTS detailed_guidance JSONB,');
    console.log('  ADD COLUMN IF NOT EXISTS personal_insights JSONB;');
    console.log('─'.repeat(70));
  }
}

runMigration();

