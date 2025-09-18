import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Environment variables for production
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://fbmlsdftletwtmnxhswk.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibWxzZGZ0bGV0d3Rtbnhoc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NDg3MDEsImV4cCI6MjA3MzIyNDcwMX0.9TRO_nnxBxDI_oLMnYoELUogdwxsSJwELzNRxka_EUo";

// Validate environment variables in production
if (import.meta.env.PROD) {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('Missing required Supabase environment variables');
  }
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'edushield-web',
    },
  },
});