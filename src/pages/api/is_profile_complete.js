/**
 * The endpoint is responsible for checking if a user's profile is complete in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/is_profile_complete
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * user_id (string): The ID of the user to check the profile completion for.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The user's profile completion status was checked successfully. The response will contain the profile completion status.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .select("is_complete")
    .eq("user_id", user_id);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
