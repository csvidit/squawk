import supabase from "@/supabase/supabase";
/**
 * The endpoint is responsible for creating a follow request between two users and storing it in a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/follow_request
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * currentUserID (string): The ID of the user who is sending the follow request.
 * selectedUserID (string): The ID of the user who will receive the follow request.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The follow request was created successfully. The response will contain the inserted data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside FOLLOW_REQUEST API endpoint");

  const { currentUserID, selectedUserID } = req.body;

  const { data, error } = await supabase
    .from("Follow Requests")
    .insert({ requester_id: currentUserID, receiver_id: selectedUserID })
    .select();

  if (error) {
    res.status(500);
    console.log(error);
    return;
  } else {
    console.log(data);
    res.status(200).json(data);
  }
}
