// var AuthenticationClient = require("auth0").AuthenticationClient;
var axios = require("axios").default;
var auth0 = require("auth0")

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
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    res.status(200).send('Password reset email sent.');
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// let webAuth = new auth0.WebAuth({
//   domain:       'squawk-social.us.auth0.com',
//   clientID:     
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).end();
//     return;
//   }
//   const { email } = req.body;

//   try {
//     webAuth.changePassword({
//       connection: 'Username-Password-Authentication',
//       email:   email
//     }, function (err, resp) {
//       if(err){
//         res.status(500).json({ error: err });
//       }
//       else{
//         res.status(200).send('Password reset email sent.');
//       }
//     });
//     res.status(200).send('Password reset email sent.');
//   } catch (error) {
//     // Handle any errors that occur
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// const auth0Client = new AuthenticationClient({
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).end();
//     return;
//   }
//   const { email } = req.body;

//   try {
//     await auth0Client.requestChangePasswordEmail({
//       email,
//       connection: "Username-Password-Authentication",
//     });
//     res.status(200).send('Password reset email sent.');
//   } catch (error) {
//     // Handle any errors that occur
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).end();
//     return;
//   }

//   try {
//     const token = await getAuth0AccessToken();
//   } catch (error) {
//     // Handle any errors that occur
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function getAuth0AccessToken() {
//   const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
//     grant_type: 'client_credentials',
//     client_id: process.env.AUTH0_CLIENT_ID,
//     client_secret: process.env.AUTH0_CLIENT_SECRET,
//     audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
//   });

//   return response.data.access_token;
// }
