/**
 * The endpoint is responsible for sending a password reset email to a user using the Auth0 service.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/reset_password
 * 
 * Request Body Parameters
 * The request body should be sent as JSON. The following parameter is expected:
 * email (string): The email address of the user to send the password reset email to.
 * 
 * Response
 * The endpoint provides different responses depending on the outcome of the password reset email sending process:
 * Success (HTTP 200): The password reset email was sent successfully. The response body will contain the message "Password reset email sent."
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Server Error (HTTP 500): An error occurred on the server while processing the request. The response body will contain an error message.
 */

var axios = require("axios").default;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email } = req.body;

  let options = {
    method: "POST",
    url: "https://squawk-social.us.auth0.com/dbconnections/change_password",
    headers: { "content-type": "application/json" },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      email: email,
      connection: "Username-Password-Authentication",
    },
  };

  try {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    res.status(200).send("Password reset email sent.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
