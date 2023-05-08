import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside UPDATE_REACTIONS API endpoint");

  const { post_id, user_id, reaction, action } = req.body;
  console.log("RESPONSE BODY", req.body);

  const { data, error } = await supabase
    .from("Posts")
    .select()
    .eq("post_id", post_id);
  if (error) {
    console.log(error);
    res.status(500);
  } else {
    let oldArray;
    switch (reaction) {
      case "reactions_100":
        oldArray = data[0].reactions_100;
        console.log(data[0].reactions_100);
        break;
      case "reactions_nailpaint":
        oldArray = data[0].reactions_nailpaint;
        console.log(data[0].reactions_nailpaint);
        break;
      case "reactions_skull":
        oldArray = data[0].reactions_skull;
        console.log(data[0].reactions_skull);
        break;
      case "reactions_snake":
        oldArray = data[0].reactions_snake;
        console.log(data[0].reactions_snake);
        break;
    }
    console.log(oldArray);
    if (action === "add") {
      oldArray.push(user_id);
      const { data, error } = await supabase
        .from("Posts")
        // .update({ reaction: supabase.sql`${reaction} || ${user_id}` })
        // .update({
        //   reaction: supabase.raw(`array.append(${reaction}, ${user_id})`),
        // })
        .update({[reaction]: oldArray})
        .eq("post_id", post_id)
        .order("created_at", { ascending: false })
        .select()
        .eq("post_id", post_id);

      if (error) {
        console.log(error);
        res.status(500);
      }
      console.log("SUCCESSFUL", data);
      res.status(200).json(data);
    } else {
      oldArray = oldArray.filter(x =>
        x!= user_id
      );
      const { data, error } = await supabase
        .from("Posts")
        // .update({ reaction: supabase.sql`array.remove(${reaction}, ${user_id})` })
        // .update({
        //   reaction: supabase.raw(`array.remove(${reaction}, ${user_id})`),
        // })
        .update({[reaction]: oldArray})
        .eq("post_id", post_id)
        .order("created_at", { ascending: false })
        .select()
        .eq("post_id", post_id);

      if (error) {
        console.log(error);
        res.status(500);
      }
      console.log("SUCCESSFUL", data);
      res.status(200).json(data);
    }
  }

  // const updatedData = data?.map((item, index) => {
  //     item.image_url="https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/"+item.image_url;
  // })
}
