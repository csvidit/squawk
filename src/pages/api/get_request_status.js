import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_REQUEST_STATUS API endpoint");

  const { currentUserID, selectedUserID } = req.body;

  const { data, error } = await supabase
    .from("Follow Requests")
    .select("status")
    .eq("requester_id", currentUserID)
    .eq("receiver_id", selectedUserID);

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    if(!data)
    {
        res.status(404);
        return;
    }
    res.status(200).json(data);
  }
}
