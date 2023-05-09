import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside DELETE_POST API endpoint");

  const { post_id } = req.body;

  const { data, error } = await supabase
    .from("Posts")
    .delete()
    .eq("post_id", post_id)

  if (error) {
    console.log(error);
    return res.status(500);
  } else {
    console.log(data);
    return res.status(200).json({status: "Deleted This Post"});
  }
}
