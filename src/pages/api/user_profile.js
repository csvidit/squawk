var axios = require("axios").default;
var auth0 = require("auth0");
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://eryflyojnheiubiqebez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWZseW9qbmhlaXViaXFlYmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNzYxNDUsImV4cCI6MTk5NDY1MjE0NX0.9lfXqO99jonaWUXEkr3sByawBHBc-s62E1ShD-zR33w"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { user_id } = req.body;

  const { data, error } = await supabase.from('Users').select().eq('user_id', user_id);

  if(error)
  {
    res.status(500).json({ error: "Internal server error" });
  }
  res.status(200).json(data);
}
