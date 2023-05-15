/**
 * The endpoint is responsible for retrieving the followers of a user from the Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/get_followers
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * user_id (string): The ID of the user whose followers are being retrieved.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The followers were retrieved successfully. The response will contain an array of follower objects.
 * Not Found (HTTP 404): The user specified in the request was not found.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request.
 */

import supabase from "@/supabase/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside GET_FOLLOWERS API endpoint");

  const { user_id } = req.body;

//   const { data, error } = await supabase
//     .from('Users')
//     .select('username')
//     .in('user_id', (query) =>
//       query
//         .from('Users')
//         .select('followers')
//         .eq('user_id', user_id)
//         .single()
//         .then((res) => res.data.followers)
//         .catch((err) => {
//           console.error('Error fetching followers:', err);
//           return [];
//         })
//     );

    // const { data, error } = await supabase
    // .from('Users')
    // .select('user_id, username')
    // .in('user_id', (query) =>
    //   query
    //     .from('Users')
    //     .select('followers')
    //     .eq('user_id', user_id)
    //     .single()
    //     .then((res) => res.data.followers)
    //     .catch((err) => {
    //       console.error('Error fetching followers:', err);
    //       return [];
    //     })
    // );

    const {data, error} = await supabase 
    .from('Users')
    .select('followers')
    .eq('user_id', user_id);

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
