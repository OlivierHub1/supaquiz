import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://dseaikseyvqcxvgatbxf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWFpa3NleXZxY3h2Z2F0YnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NDg0MjgsImV4cCI6MjAyMjQyNDQyOH0.UaPw5PXf7g_i6dDAg8qKH_iNH8zmGO0eWZ1ZDoPw9JY')