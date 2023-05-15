import supabase from "@/supabase/supabase";

/**
 * The endpoint is responsible for updating the username of a user in a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/change_username
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * userID (string): The ID of the user whose username needs to be updated.
 * newUsername (string): The new username to be assigned to the user.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The username was updated successfully. The response will contain the updated user data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { userID, newUsername } = req.body;

  const { data, error } = await supabase
    .from("Users")
    .update({username: newUsername})
    .eq("user_id", userID)
    .select()
    .eq("user_id", userID);

  if (error) {
    res.status(500);
  }
  console.log(data);
  res.status(200).json(data);
}
