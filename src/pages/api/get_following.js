import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_FOLLOWERS API endpoint");

  const { user_id } = req.body;
  const { data, error } = await supabase
    .from("Users")
    .select("following")
    .eq("user_id", user_id);

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    if (!data) {
      res.status(404);
      return;
    }
    res.status(200).json(data);
  }
}
