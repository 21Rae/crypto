import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns the Supabase client instance if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.
 * Otherwise returns null so the application can gracefully fall back.
 */
export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url === '' || anonKey === '') {
    return null;
  }

  try {
    supabaseInstance = createClient(url, anonKey);
    return supabaseInstance;
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    return null;
  }
}

/**
 * Helper to check if Supabase is configured in environment variables.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_ANON_KEY &&
      import.meta.env.VITE_SUPABASE_URL.trim() !== '' &&
      import.meta.env.VITE_SUPABASE_ANON_KEY.trim() !== ''
  );
}
