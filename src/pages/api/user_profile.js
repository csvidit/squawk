/**
 * /**
 * The endpoint is responsible for fetching the profile of a user from the Supabase PostgreSQL database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/user_profile
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameters are expected:
 * user_id (string): The ID of the user whose profile is required.
 * 
 * Response
 * The endpoint provides different responses depending on the outcome of the follow request update process:
 * Success (HTTP 200): The user profile was fetched successfully. The response body will contain the profile data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request. The response body will contain an error message.
 */

var axios = require("axios").default;
var auth0 = require("auth0");
const supabase = require("@/supabase/supabase").default;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  
  const { user_id } = req.body;

  try {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("user_id", user_id);
    
    if (error) {
      res.status(500).end();
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}


// var axios = require("axios").default;
// var auth0 = require("auth0");
// import supabase from "@/supabase/supabase";

// export default async function handler(
//   req: { method: string; body: { user_id: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       end: { (): void; new (): any };
//       json: { (arg0: { [x: string]: any }[] | null): void; new (): any };
//     };
//   }
// ) {
//   if (req.method !== "POST") {
//     res.status(405).end();
//     return;
//   }
//   const onFulfilled = () => {};
//   const onRejected = () => {};
//   const { user_id } = req.body;

//   const { data, error } = await supabase
//     .from("Users")
//     .select()
//     .eq("user_id", user_id);
//   if(error)
//   {
//     res.status(500);
//   }
//   else {
//     console.log(data);
//     res.status(200).json(data);
//     return;
//   }
// }

