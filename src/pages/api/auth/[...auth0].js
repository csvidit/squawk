// pages/api/auth/[...auth0].js

/**
 * This API endpoint is for handling all kinds of user authentication. 
 * The square brackets [] in the name of the endpoint file imply that this accepts a number of different dynamic routes, 
 * such as /api/auth/login, /api/auth/logout. the handleAuth function is crucial here, which leads the user to the 
 * necessary page or redirects them. All redirects are currently defined in the Auth0 management console with
 * reference to localhost:3000, since that was the domain used for development.
 * 
 */

import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

const afterCallback = async (req, res, session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
