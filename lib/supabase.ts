
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkekdiyfzdvthpkhhpjc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZWtkaXlmemR2dGhwa2hocGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDk4NjksImV4cCI6MjA3OTgyNTg2OX0.GAxVcgVgLpMmsGmUzt6FSE7eEGU41IYkUOlpYZbbBeM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
