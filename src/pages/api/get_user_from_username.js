/**
 * The endpoint is responsible for finding a user by their username in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/get_user_from_username
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * username (string): The username of the user to find.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The user was found successfully. The response will contain the user data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { username } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("username", username);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
