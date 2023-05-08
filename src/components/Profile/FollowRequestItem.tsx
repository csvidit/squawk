import { Profile } from "@/interfaces/Profile";
import { SetStateAction, useEffect, useState } from "react";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";

const FollowRequestItem = (props: {
  request: {
    id: bigint;
    requester_id: string;
    receiver_id: string;
    status: string;
  };
  index: number;
  allRequests: any;
  requestsStateChanger: any;
}) => {
  const user_id = props.request.requester_id;
  const [user, setUser] = useState<Profile>();
  const [isPending, setIsPending] = useState(true);
  const currentUser = props.request.requester_id;
  const selectedUser = props.request.receiver_id;

  useEffect(() => {
    const getUser = () => {
      fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      })
        .then((response) => response.json())
        .then((profile) => setUser(profile[0]))
        .catch((error) => console.log(error));
    };
    getUser();
  }, [user_id]);

  const acceptHandler = () => {
    fetch("/api/add_followers_following", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUser, selectedUser }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

      const newStatus = "accepted";
      const requester = props.request.requester_id;
      const receiver = props.request.receiver_id;

    fetch("/api/update_request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requester, receiver, newStatus }),
    })
      .then((response) => response.json())
      .then(props.requestsStateChanger(props.allRequests.splice(props.index, 1)))
      .catch((error) => console.log(error));
    
    setIsPending(false);
  };

  const declineHandler = () => {
    const newStatus = "declined";
    const requester = props.request.requester_id;
    const receiver = props.request.receiver_id;

  fetch("/api/update_request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requester, receiver, newStatus }),
  })
    .then((response) => response.json())
    .then(props.requestsStateChanger(props.allRequests.splice(props.index, 1)))
    .catch((error) => console.log(error));

    setIsPending(false);
  };

  if(isPending)
  {
    return (
      <div className="flex flex-row justify-between items-center rounded-full w-full p-3 lg:p-5 h-16 bg-black border border-transparent bg-opacity-50 backdrop-blur-md transition-all">
        <div className="flex">
          <p className="text-neutral-100 text-2xl">{user?.username}</p>
        </div>
        <div className="flex flex-row space-x-3 lg:space-x-5">
          <button
            type="button"
            onClick={acceptHandler}
            className="flex group flex-row justify-center items-center rounded-full border border-sky-500 bg-black bg-opacity-50 text-neutral-100 bg-transparent transition-all hover:bg-sky-500 hover:text-neutral-900 hover:border-sky-500"
          >
            <div className="flex flex-row space-x-1 justify-center items-center pl-4 pr-4 pt-1 pb-1 border-none text-lg font-medium">
              <p className="text-sky-500 group-hover:text-sky-900 transition-all">
                <SlUserFollowing />
              </p>
              <p className="hidden lg:flex">Accept</p>
            </div>
          </button>
          <button
            type="button"
            onClick={declineHandler}
            className="flex group flex-row justify-center items-center rounded-full border border-red-500 bg-black bg-opacity-50 text-neutral-100 bg-transparent transition-all hover:bg-red-500 hover:text-neutral-900 hover:border-red-500"
          >
            <div className="flex flex-row space-x-1 justify-center items-center pl-4 pr-4 pt-1 pb-1 border-none text-lg font-medium">
              <p className="text-red-500 group-hover:text-red-900 transition-all">
                <SlUserUnfollow />
              </p>
              <p className="hidden lg:flex">Decline</p>
            </div>
          </button>
        </div>
      </div>
    );
  }
  else
  {
    return(<></>)
  }
};

export default FollowRequestItem;
