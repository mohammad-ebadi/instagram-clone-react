import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ehlsglqnkkdepoagbnhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVobHNnbHFua2tkZXBvYWdibmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDE1NjIsImV4cCI6MjA2ODUxNzU2Mn0.TaoyPZX6BSi4kifVVlY4ZxQtLKJeelpN97RUoNaLNs0";

export const supabase = createClient(supabaseUrl, supabaseKey);
