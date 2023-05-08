import React, { useEffect, useState } from "react";
import Posts from "../Posts";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Profile } from "@/interfaces/Profile";
import SelfProfileHeader from "./SelfProfileHeader";

const SelfProfile = (props: { user: Profile }) => {
  const [posts, setPosts] = useState([]);
  const [resStatus, setResStatus] = useState(500);
  const username = props.user.username;
  const user_id = props.user.user_id;
  const criteria = "self";

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/get_posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, criteria }),
      });
      const posts = await response.json();
      setPosts(posts);
    };
    fetchPosts();
  }, [user_id, username]);

  return (
    <React.Fragment>
     <SelfProfileHeader username={username} numPosts={posts.length} followers={props.user.followers == null ? 0 : props.user.followers.length} following={props.user.following == null ? 0 : props.user.following.length}/>
      <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
        <Posts user_id={user_id} criteria="self" />
      </div>
    </React.Fragment>
  );
};

export default SelfProfile;