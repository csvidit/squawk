import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside FOLLOW_REQUEST API endpoint");

  const { currentUserID, selectedUserID } = req.body;

  const { data, error } = await supabase
    .from("Follow Requests")
    .insert({ requester_id: currentUserID, receiver_id: selectedUserID })
    .select();

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    res.status(200).json(data);
  }
}
