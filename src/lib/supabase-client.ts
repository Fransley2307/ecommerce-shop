import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcgxsxunwvjhjdbljepc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZ3hzeHVud3ZqaGpkYmxqZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjE3NjMsImV4cCI6MjA3MTEzNzc2M30.yrOx8ug8IblFYm8etTEvGkn5x6D58jbhDt0EDkLfD4c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
