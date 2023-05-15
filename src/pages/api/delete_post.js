/**
 * The endpoint is responsible for deleting a post from a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/delete_post
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * post_id (string): The ID of the post to be deleted.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The post was deleted successfully. The response will contain a success message.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside DELETE_POST API endpoint");

  const { post_id } = req.body;

  const { data, error } = await supabase
    .from("Posts")
    .delete()
    .eq("post_id", post_id)

  if (error) {
    console.log(error);
    return res.status(500);
  } else {
    console.log(data);
    return res.status(200).json({status: "Deleted This Post"});
  }
}
