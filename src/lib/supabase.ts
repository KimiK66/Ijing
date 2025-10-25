import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Default Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client component Supabase client
export const createSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey)

// Database schema types (these will be generated from Supabase)
export interface Database {
  public: {
    Tables: {
      hexagrams: {
        Row: {
          id: string
          number: number
          name: Record<string, string>
          chinese_name: string
          upper_trigram: string
          lower_trigram: string
          judgement: Record<string, string>
          image: Record<string, string>
          lines: Record<string, any>[]
          interpretation: Record<string, string>
          keywords: Record<string, string>
          element: string
          season: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          number: number
          name: Record<string, string>
          chinese_name: string
          upper_trigram: string
          lower_trigram: string
          judgement: Record<string, string>
          image: Record<string, string>
          lines: Record<string, any>[]
          interpretation: Record<string, string>
          keywords: Record<string, string>
          element: string
          season: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          number?: number
          name?: Record<string, string>
          chinese_name?: string
          upper_trigram?: string
          lower_trigram?: string
          judgement?: Record<string, string>
          image?: Record<string, string>
          lines?: Record<string, any>[]
          interpretation?: Record<string, string>
          keywords?: Record<string, string>
          element?: string
          season?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_readings: {
        Row: {
          id: string
          user_id: string
          hexagram_id: string
          question?: string
          context?: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hexagram_id: string
          question?: string
          context?: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hexagram_id?: string
          question?: string
          context?: string
          timestamp?: string
          created_at?: string
        }
      }
      user_journals: {
        Row: {
          id: string
          user_id: string
          reading_id?: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reading_id?: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reading_id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
