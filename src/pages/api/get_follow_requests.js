import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_FOLLOW_REQUESTS API endpoint");

  const { user_id, type} = req.body;
  const status = "pending";

  if(type == "incoming")
  {
    const { data, error } = await supabase
    .from("Follow Requests")
    .select()
    .eq("receiver_id", user_id)
    .eq("status", status);

    if (error) {
      res.status(500);
      console.log(error);
      return;
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  }
  else
  {
    const { data, error } = await supabase
    .from("Follow Requests")
    .select()
    .eq("requester_id", user_id)
    .eq("status", "pending");

    if (error) {
      res.status(500);
      console.log(error);
      return;
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  }
}
