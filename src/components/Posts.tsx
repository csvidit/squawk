//criteria can have one of two values : self, following

import { useState, useEffect } from "react";
import UserProfilePostCard from "./UserProfilePostCard";
import PostCard from "./PostCard";
import PostCard2 from "./Profile/PostCard2";
import PublicPostCard from "./PublicPostCard";
import PublicProfilePostCard from "./PublicProfilePostCard";

const Posts = (props: { user_id: string; criteria: string }) => {
  const [posts, setPosts] = useState([]);
  const user_id = props.user_id;
  const criteria = props.criteria;

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
  }, [criteria, user_id]);

  if(criteria == "self")
  {
    return (
      <div className="flex flex-col space-y-4 items-center lowercase mt-20 w-screen">
        {posts.map(
          (
            item: {
              image_url: string;
              created_at: string;
              caption: string;
              reactions_100: string[];
              reactions_nailpaint: string[];
              reactions_skull: string[];
              reactions_snake: string[];
              post_id: string;
            },
            index
          ) => {
            const reactions = {
              reactions_100: item.reactions_100,
              reactions_nailpaint: item.reactions_nailpaint,
              reactions_skull: item.reactions_skull,
              reactions_snake: item.reactions_snake,
            };
            const fullImageUrl =
              "https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/" +
              item.image_url;
            return (
              <PostCard2
                reactions_100 = {item.reactions_100}
                reactions_nailpaint = {item.reactions_nailpaint}
                reactions_skull = {item.reactions_skull}
                reactions_snake= {item.reactions_snake}
                key={index}
                src={fullImageUrl}
                caption={item.caption}
                date={new Date(item.created_at).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
                post_id = {item.post_id}
              />
            );
          }
        )}
      </div>
    );
  }
  else if(criteria == "search")
  {
    return (
      <div className="flex flex-col space-y-4 items-center lowercase mt-20 w-screen">
        {posts.map(
          (
            item: {
              image_url: string;
              created_at: string;
              caption: string;
              reactions_100: string[];
              reactions_nailpaint: string[];
              reactions_skull: string[];
              reactions_snake: string[];
              post_id: string;
            },
            index
          ) => {
            const reactions = {
              reactions_100: item.reactions_100,
              reactions_nailpaint: item.reactions_nailpaint,
              reactions_skull: item.reactions_skull,
              reactions_snake: item.reactions_snake,
            };
            const fullImageUrl =
              "https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/" +
              item.image_url;
            return (
              <PublicProfilePostCard
                reactions_100 = {item.reactions_100}
                reactions_nailpaint = {item.reactions_nailpaint}
                reactions_skull = {item.reactions_skull}
                reactions_snake= {item.reactions_snake}
                key={index}
                src={fullImageUrl}
                caption={item.caption}
                date={new Date(item.created_at).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
                post_id = {item.post_id}
              />
            );
          }
        )}
      </div>
    );
  }
  else
  {
    return (
      <div className="flex flex-col space-y-4 items-center lowercase mt-20 w-screen">
        {posts.map(
          (
            item: {
              Users: {
                username: string;
              }
              image_url: string;
              created_at: string;
              caption: string;
              reactions_100: string[];
              reactions_nailpaint: string[];
              reactions_skull: string[];
              reactions_snake: string[];
              post_id: string;
            },
            index
          ) => {
            const reactions = {
              reactions_100: item.reactions_100,
              reactions_nailpaint: item.reactions_nailpaint,
              reactions_skull: item.reactions_skull,
              reactions_snake: item.reactions_snake,
            };
            const fullImageUrl =
              "https://eryflyojnheiubiqebez.supabase.co/storage/v1/object/public/user_posts/" +
              item.image_url;
            return (
              <PublicPostCard
              username={item.Users.username}
                reactions_100 = {item.reactions_100}
                reactions_nailpaint = {item.reactions_nailpaint}
                reactions_skull = {item.reactions_skull}
                reactions_snake= {item.reactions_snake}
                key={index}
                src={fullImageUrl}
                caption={item.caption}
                date={new Date(item.created_at).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
                post_id = {item.post_id}
              />
            );
          }
        )}
      </div>
    );
  }
};

export default Posts;
