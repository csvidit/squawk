/**
 * The endpoint is responsible for retrieving follow requests for a user from a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/get_follow_requests
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * user_id (string): The ID of the user for whom follow requests are being retrieved.
 * type (string): The type of follow requests to retrieve. Valid values are "incoming" and "outgoing".
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The follow requests were retrieved successfully. The response will contain an array of follow request objects.
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
  console.log("Inside GET_FOLLOW_REQUESTS API endpoint");

  const { user_id, type} = req.body;
  const status = "pending";

  if(type == "incoming")
  {
    const { data, error } = await supabase
    .from("Follow Requests")
    .select()
    .eq("receiver_id", user_id)
    .eq("status", status);

    if (error) {
      res.status(500);
      console.log(error);
      return;
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  }
  else
  {
    const { data, error } = await supabase
    .from("Follow Requests")
    .select()
    .eq("requester_id", user_id)
    .eq("status", "pending");

    if (error) {
      res.status(500);
      console.log(error);
      return;
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  }
}
