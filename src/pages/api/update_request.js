/**
 * The endpoint is responsible for updating the status of a follow request between two users in the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/update_request
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * requester (string): The ID of the user who sent the follow request.
 * receiver (string): The ID of the user who received the follow request.
 * newStatus (string): The new status of the follow request.
 * 
 * Response
 * The endpoint provides different responses depending on the outcome of the follow request update process:
 * Success (HTTP 200): The follow request was updated successfully. The response body will contain the updated follow request data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request. The response body will contain an error message.
 */

import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside UPDATE_REQUEST API endpoint");

  const { requester, receiver, newStatus } = req.body;

  // const { data, error } = await supabase
  //   .from("Follow Requests")
  //   .insert({ newStatus })
  //   .and(
  //       supabase.from("Follow Requests").eq("requester_id", requester),
  //       supabase.from("Follow Requests").eq("receiver_id", receiver)
  //   )
  //   .select();

  const { data, error } = await supabase
    .from("Follow Requests")
    .update({ requester_id: requester, receiver_id: receiver, status: newStatus })
    .eq("requester_id", requester)
    .eq("receiver_id", receiver)
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
