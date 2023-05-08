import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside SEARCH_USERS API endpoint");

  const { currentUser, searchedUser } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select("followers")
    .eq("username", searchedUser)
    .contains("followers", [currentUser]);

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else if (data.length === 0) {
    res.status(404).json({ status: "Not Following This User" });
    return;
  } else {
    console.log(data);
    res.status(200).json({status: "Following This User"});
  }
}
