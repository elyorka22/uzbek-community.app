import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Типы для базы данных
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          telegram_id: number;
          first_name: string;
          last_name: string | null;
          username: string | null;
          photo_url: string | null;
          country: string;
          city: string;
          status: 'student' | 'working' | 'living' | 'other';
          interests: string[];
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          telegram_id: number;
          first_name: string;
          last_name?: string | null;
          username?: string | null;
          photo_url?: string | null;
          country: string;
          city: string;
          status: 'student' | 'working' | 'living' | 'other';
          interests?: string[];
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          telegram_id?: number;
          first_name?: string;
          last_name?: string | null;
          username?: string | null;
          photo_url?: string | null;
          country?: string;
          city?: string;
          status?: 'student' | 'working' | 'living' | 'other';
          interests?: string[];
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 