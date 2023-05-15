/**
 * The endpoint is responsible for retrieving the status of a follow request between two users from the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/get_request_status
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * currentUserID (string): The ID of the user who sent the follow request.
 * selectedUserID (string): The ID of the user who received the follow request.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The status of the follow request was retrieved successfully. The response will contain the status value.
 * Not Found (HTTP 404): The follow request was not found.
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
  console.log("Inside GET_REQUEST_STATUS API endpoint");

  const { currentUserID, selectedUserID } = req.body;

  const { data, error } = await supabase
    .from("Follow Requests")
    .select("status")
    .eq("requester_id", currentUserID)
    .eq("receiver_id", selectedUserID);

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    if(!data)
    {
        res.status(404);
        return;
    }
    res.status(200).json(data);
  }
}
