/**
 * The endpoint is responsible for searching for users based on a provided query in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/search_users
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * query (string): The search query used to find matching usernames.
 * 
 * Response
 * The endpoint provides a JSON response for a successful search:
 * Success (HTTP 200): The search was successful. The response body will contain an array of user objects that match the search query.
 * If an error occurs during the search process, the endpoint will respond with an appropriate error status and a JSON response containing an error message.
 */

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
