import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { username } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("username", username);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
