import React, { useEffect, useState } from "react";
import Posts from "../Posts";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Profile } from "@/interfaces/Profile";
import FollowButton from "./FollowButton";
import OtherProfileHeader from "./OtherProfileHeader";

const RestrictedProfile = (props: {
  currentUser: Profile;
  selectedUser: Profile;
}) => {
  const [posts, setPosts] = useState([]);
  const [resStatus, setResStatus] = useState(500);
  // const [result, setResult] = useState<[{status: string}]>();
  const [isRequestPending, setRequestPending] = useState(false);
  const selectedUsername = props.selectedUser.username;
  const selectedUserID = props.selectedUser.user_id;
  const currentUsername = props.currentUser.username;
  const currentUserID = props.currentUser.user_id;
  const type = "outgoing";

  // useEffect(() => {
  //   const requestStatus = async () => {
  //     const response = await fetch("/api/get_request_status", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ currentUserID, selectedUserID }),
  //     });
  //     if(response.status != 404)
  //     {
  //       const result = await response.json();
  //       // setResult(await response.json());
  //       console.log("RESULT IS");
  //       console.log(result);
  //       if (result != null && result.length >= 0) {
  //         if (result[0].status == "pending") {
  //           setRequestPending(true);
  //         } else {
  //           setRequestPending(false);
  //         }
  //       }
  //     }
  //     console.log(isRequestPending);
  //   };
  //   requestStatus();
  // }, [currentUserID, isRequestPending, selectedUserID]);

  useEffect(() => {
    const requestStatus = () => {
      fetch("/api/get_request_status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserID, selectedUserID }),
      })
        .then((response) => {
          if (response.status != 404) {
            return response.json();
          }
        })
        .then((result) => {
          if (result && result.length > 0) {
            console.log("RESULT IS");
            console.log(result);
            if (result[0].status == "pending") {
              setRequestPending(true);
            } else {
              setRequestPending(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching request status:", error);
        });
      console.log(isRequestPending);
    };
    requestStatus();
  }, [currentUserID, isRequestPending, selectedUserID]);
  

  const followRequestHandler = () => {
    const followRequest = async () => {
      const response = await fetch("/api/follow_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserID, selectedUserID }),
      });
      const result = await response.json();
      console.log(result);
      setRequestPending(true);
    };
    followRequest();
  };

  return (
    <React.Fragment>
      <OtherProfileHeader
        username={selectedUsername}
        numPosts="hidden number of"
      />
      <div className="flex flex-col space-y-3 lg:space-y-5 justify-center items-center mt-10 w-screen grow">
        {!isRequestPending && (
          <p className="text-2xl text-lime-500">
            you are not following this user
          </p>
        )}
        {!isRequestPending && (
          <FollowButton handleClick={followRequestHandler} />
        )}
        {isRequestPending && (
          <p className="rounded-full border border-lime-500 pt-2 pb-2 pl-4 pr-4 text-2xl text-lime-500 animate-pulse">
            Follow Request Pending
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default RestrictedProfile;
