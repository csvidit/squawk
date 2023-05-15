/**
 * The endpoint is responsible for updating the followers and following relationships between users in a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/update_followers_following
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * currentUser (string): The ID of the current user.
 * selectedUser (string): The ID of the user to update the relationship with.
 * type (string): The type of relationship update. It can be either "follower" or "following". 
 * If it is "follower", the current user wants to remove the selected user as a follower. 
 * If it is "following", the current user wants to stop following the selected user.
 * 
 * Response
 * The endpoint provides a JSON response for a successful update:
 * Success (HTTP 200): The follow relationship between users was updated successfully. The response will contain a message indicating the success of the operation.
 * If an error occurs during the update process or if the requested users are not found, the endpoint will respond with an appropriate error status and a JSON response containing an error message.
 */

import supabase from "@/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside UPDATE_FOLLOWERS_FOLLOWING API endpoint");

  // type = "follower" | "following"
  // follower means currentUser wants to remove selectedUser as follower
  // following means currentUser wants to stop following selectedUser
  const { currentUser, selectedUser, type } = req.body;

  if (type == "follower") {
    const { data: user, error } = await supabase
      .from("Users")
      .select()
      .eq("user_id", currentUser)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the selectedUser from the followers array
    const updatedFollowers = user.followers.filter(
      (follower) => follower !== selectedUser
    );

    // Update the user row with the updated followers array
    const { error: updateError } = await supabase
      .from("Users")
      .update({ followers: updatedFollowers })
      .eq("user_id", currentUser);

    if (updateError) {
      console.error(updateError);
      return res.status(500).json({ error: "Server error" });
    }

    // Find the selectedUser row
    const { data: selectedUserData, error: selectedUserError } = await supabase
      .from("Users")
      .select()
      .eq("user_id", selectedUser)
      .single();

    if (selectedUserError) {
      console.error(selectedUserError);
      return res.status(500).json({ error: "Server error" });
    }

    if (!selectedUserData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the currentUser from the following array
    const updatedFollowing = selectedUserData.following.filter(
      (following) => following !== currentUser
    );

    // Update the selectedUser row with the updated following array
    const { error: selectedUserUpdateError } = await supabase
      .from("Users")
      .update({ following: updatedFollowing })
      .eq("user_id", selectedUser);

    if (selectedUserUpdateError) {
      console.error(selectedUserUpdateError);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
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

    // Remove the currentUser from the selectedUser followers array
    const updatedFollowers = user.followers.filter(
      (follower) => follower !== currentUser
    );

    // Update the user row of selectedUser with the updated followers array
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

    // Remove the selectedUser from the currentUser following array
    const updatedFollowing = currentUserData.following.filter(
      (following) => following !== selectedUser
    );

    // Update the currentUser row with the updated following array
    const { error: currentUserUpdateError } = await supabase
      .from("Users")
      .update({ following: updatedFollowing })
      .eq("user_id", currentUser);

    if (currentUserUpdateError) {
      console.error(currentUserUpdateError);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res
    .status(200)
    .json({ message: "Follow relationship removed successfully" });
}
