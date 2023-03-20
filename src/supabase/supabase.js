import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://eryflyojnheiubiqebez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWZseW9qbmhlaXViaXFlYmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNzYxNDUsImV4cCI6MTk5NDY1MjE0NX0.9lfXqO99jonaWUXEkr3sByawBHBc-s62E1ShD-zR33w"
);
