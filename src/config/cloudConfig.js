/**
 * Cloud configuration for Supabase REST API.
 * API key is sourced from environment variables only — never hardcoded.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn(
    '[cloudConfig] VITE_SUPABASE_ANON_KEY is not set. Cloud sync will not work. ' +
    'Add it to your .env or .env.local file.'
  );
}

export const CLOUD_CONFIG = {
  endpointUrl: supabaseUrl ? `${supabaseUrl}/rest/v1` : '',
  apiKey: supabaseAnonKey,
  autoSync: true,
  provider: "supabase_rest"
};