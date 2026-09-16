import { createClient } from '@supabase/supabase-js';

// These are the PUBLIC anon key + URL — safe to expose in client code.
// Row-Level Security (see supabase/migrations/0002_rls.sql) is what
// actually protects data, not keeping this key secret.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly at build time rather than shipping a silently broken client.
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — set these in .env.local (see .env.example).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
