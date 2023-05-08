import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside SEARCH_USERS API endpoint");

  const { query } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select()
    .ilike("username", `%${query}%`);

  if (error) {
    res.status(500);
    console.log(error);
  }
  console.log(data);
  res.status(200).json(data);
}
