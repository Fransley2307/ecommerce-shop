import { createClient } from '@supabase/supabase-js';

// Use Vite environment variables (must start with VITE_ to be exposed to the client)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
	// Log a clear warning in development if env vars are missing
	// Avoid throwing here to let the app boot for non-supabase flows
	// (but the app will fail when attempting supabase requests)
	// eslint-disable-next-line no-console
	console.warn('[supabase-client] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not defined. Create a .env with these values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
