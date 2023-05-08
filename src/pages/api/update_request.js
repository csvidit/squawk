import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside UPDATE_REQUEST API endpoint");

  const { requester, receiver, newStatus } = req.body;

  // const { data, error } = await supabase
  //   .from("Follow Requests")
  //   .insert({ newStatus })
  //   .and(
  //       supabase.from("Follow Requests").eq("requester_id", requester),
  //       supabase.from("Follow Requests").eq("receiver_id", receiver)
  //   )
  //   .select();

  const { data, error } = await supabase
    .from("Follow Requests")
    .update({ requester_id: requester, receiver_id: receiver, status: newStatus })
    .eq("requester_id", requester)
    .eq("receiver_id", receiver)
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
