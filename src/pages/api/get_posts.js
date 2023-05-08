import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_POSTS API endpoint");

  const { user_id, criteria } = req.body;

  if (criteria == "self" || criteria == "search") {
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500);
    }
    // const updatedData = data?.map((item, index) => {
    //     item.image_url="https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/"+item.image_url;
    // })
    console.log(data);
    res.status(200).json(data);
  } else {
    const { data: user, error: userError } = await supabase
      .from("Users")
      .select("following")
      .eq("user_id", user_id)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }

    if (!user) {
      console.log("User not found");
      return;
    }

    // Next, fetch the posts with user_id in the user's following list
    // const { data: posts, error: postsError } = await supabase
    //   .from("Posts")
    //   .select()
    //   .in("user_id", user.following);

    const { data: posts, error: postsError } = await supabase
      .from("Posts")
      .select(`*, Users (
        username
      )`)
      .in("user_id", user.following)
      .order("created_at", { ascending: false });

    if (postsError) {
      res.status(500);
      console.error("Error fetching posts:", postsError);
      return;
    }
    res.status(200).json(posts);
  }
}
