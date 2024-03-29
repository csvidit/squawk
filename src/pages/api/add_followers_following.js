import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * The endpoint is responsible for updating the followers and following arrays of two users in a Supabase database to establish a follow relationship between them.
 * Endpoint Information
 * Method: POST
 * Path: /api/update_followers_following
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * currentUser (string): The ID of the user who is initiating the follow action.
 * selectedUser (string): The ID of the user who is being followed.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The followers and following arrays were updated successfully.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * User Not Found (HTTP 404): The user specified in the request was not found.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside UPDATE_FOLLOWERS_FOLLOWING API endpoint");

  const { currentUser, selectedUser } = req.body;

  const { data: user, error } = await supabase
    .from("Users")
    .select()
    .eq("user_id", selectedUser)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add the currentUser to the followers array
  // const updatedFollowers = user.followers.push(
  //   currentUser
  // );

  const updatedFollowers = [...user.followers, currentUser];

  console.log("UPDATED FOLLOWERS", updatedFollowers);

  // Update the user row with the updated followers array
  const { error: updateError } = await supabase
    .from("Users")
    .update({ followers: updatedFollowers })
    .eq("user_id", selectedUser);

  if (updateError) {
    console.error(updateError);
    return res.status(500).json({ error: "Server error" });
  }

  // Find the currentUser row
  const { data: currentUserData, error: currentUserError } = await supabase
    .from("Users")
    .select()
    .eq("user_id", currentUser)
    .single();

  if (currentUserError) {
    console.error(currentUserError);
    return res.status(500).json({ error: "Server error" });
  }

  if (!currentUserData) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add the selectedUser to the following array
  // const updatedFollowing = currentUserData.following.push(
  //   selectedUser
  // );

  const updatedFollowing = [...currentUserData.following, selectedUser];

  console.log("UPDATED FOLLOWING", updatedFollowing);

  // Update the currentUser row with the updated following array
  const { error: currentUserUpdateError } = await supabase
    .from("Users")
    .update({ following: updatedFollowing })
    .eq("user_id", currentUser);

  if (currentUserUpdateError) {
    console.error(currentUserUpdateError);
    return res.status(500).json({ error: "Server error" });
  }

  return res
    .status(200)
    .json({ message: "Follow relationship removed successfully" });
}
