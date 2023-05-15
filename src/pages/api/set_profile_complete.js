/**
 * The endpoint is responsible for updating the is_complete field of a user's profile in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/set_profile_complete
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * userID (string): The ID of the user whose profile needs to be marked as complete.
 * 
 * Response
 * The endpoint provides different responses depending on the outcome of the profile completion process:
 * Success (HTTP 200): The user's profile was marked as complete successfully. The response body will contain the updated user data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request. The response body will contain an error message.
 */

import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { userID } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .update({is_complete: true})
    .eq("user_id", userID);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
