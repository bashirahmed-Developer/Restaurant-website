import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://ndthxctnqhrjarjqqdqv.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdGh4Y3RucWhyamFyanFxZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MTc1MjUsImV4cCI6MjEwNzE5MzUyNX0.yjlw7i5Yt2hGXVl88Ax3GoPA7AMPyJ7Mg6qkwDIf4Kg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
