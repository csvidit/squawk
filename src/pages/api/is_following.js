/**
 * The endpoint is responsible for checking if the current user is following a specific user in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/is_following
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * currentUser (string): The ID of the current user.
 * searchedUser (string): The username of the user to check if the current user is following.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success - Following (HTTP 200): The current user is following the searched user. The response will contain a status indicating that the current user is following the searched user.
 * Success - Not Following (HTTP 404): The current user is not following the searched user. The response will contain a status indicating that the current user is not following the searched user.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.


 */

import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside IS_FOLLOWING API endpoint");

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
