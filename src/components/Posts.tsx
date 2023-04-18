//criteria can have one of two values : self, following

import { useState, useEffect } from "react";

const Posts = (props: { user_id: string; criteria: string }) => {
  const [posts, setPosts] = useState(null);

  const user_id = props.user_id;
  const criteria = props.criteria;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/get_posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, criteria}),
      });
      const posts = await response.json();
      setPosts (posts);
    };
    fetchPosts();
  }, [criteria, user_id]);


  return 

};
