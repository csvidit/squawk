import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_POSTS API endpoint");

  const { user_id, criteria } = req.body;

  if (criteria === "self") {
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .eq("user_id", user_id);

    if (error) {
      res.status(500);
    }
    const updatedData = data?.map((item, index) => {
        item.image_url="https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/"+item.image_url;
    })
    console.log(data);
    res.status(200).json(data);
  }

}
