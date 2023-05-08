import React, { useEffect, useState } from "react";
import Posts from "../Posts";
import { Profile } from "@/interfaces/Profile";
import OtherProfileHeader from "./OtherProfileHeader";

const OtherProfile = (props: { user: Profile }) => {
  const [posts, setPosts] = useState([]);
  const [resStatus, setResStatus] = useState(500);
  const username = props.user.username;
  const user_id = props.user.user_id;
  const criteria = "search";

  console.log("OTHER_PROFILE", user_id);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/get_posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, criteria }),
      });
      const posts = await response.json();
      console.log("OTHER PROFILE POSTS", posts);
      setPosts(posts);
    };
    fetchPosts();
  }, [user_id, username]);

  return (
    <React.Fragment>
      <OtherProfileHeader username={username} numPosts={posts.length} />
      <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
        <Posts user_id={user_id} criteria="search" />
      </div>
    </React.Fragment>
  );
};

export default OtherProfile;
