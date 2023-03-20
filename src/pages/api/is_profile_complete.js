import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select("is_complete")
    .eq("user_id", user_id);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
