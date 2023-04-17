import supabase from "@/supabase/supabase";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { userID, newUsername } = req.body;

  async function doesUsernameExist(newUsername) {
    const { data, error } = await supabase
      .from("Users")
      .select("username")
      .eq("username", newUsername);
  
    if (data.length > 0) {
      return true;
    }
    return false;
  }

  const userNameExists = await doesUsernameExist(newUsername);
  if (userNameExists) {
    return res.status(500).end();
  } else {
    const { data, error } = await supabase
      .from("Users")
      .update({ username: newUsername })
      .eq("user_id", userID)
      .select()
      .eq("user_id", userID);

    if (error) {
      return res.status(500).end()
    }
    console.log(data);
    return res.status(200).json(data).end();
  }
}