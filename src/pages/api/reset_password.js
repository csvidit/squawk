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
