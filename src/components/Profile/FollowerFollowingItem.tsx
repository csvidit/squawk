import { Profile } from "@/interfaces/Profile";
import { useEffect, useState } from "react";
import { SlUserUnfollow } from "react-icons/sl";

const FollowerFollowingItem = (props: { currentUser: string; selectedUser: string; type: string}) => {
  const [exists, setExists] = useState(true);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile>();
  const [selectedUserProfile, setSelectedUserProfile] = useState<Profile>();
  const currentUser = props.currentUser;
  const selectedUser = props.selectedUser;
  const type = props.type;

  useEffect(() => {
    const getCurrentUser = () => {
      const user_id = currentUser;
      fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      })
        .then((response) => response.json())
        .then((profile) => setCurrentUserProfile(profile[0]))
        .catch((error) => console.log(error));
    };
    const getSelectedUser = () => {
      const user_id = selectedUser;
      fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      })
        .then((response) => response.json())
        .then((profile) => setSelectedUserProfile(profile[0]))
        .catch((error) => console.log(error));
    };
    getCurrentUser();
    getSelectedUser();
  }, [currentUser, selectedUser]);

  const removeHandler = () => {
    const removeFollower = () => {
      fetch("/api/remove_followers_following", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, selectedUser, type}),
      })
      .then((response) => response.json())
      .catch((error) => console.log(error));

      setExists(false);
    }
    removeFollower();
  };

  if (exists) {
    return (
      <div className="flex flex-row justify-between items-center rounded-full w-full p-3 lg:p-5 h-16 bg-black border border-transparent bg-opacity-50 backdrop-blur-md transition-all">
        <div className="flex">
          <p className="text-neutral-100 text-2xl">{selectedUserProfile?.username}</p>
        </div>
        <div className="flex flex-row space-x-3 lg:space-x-5">
          <button
            type="button"
            onClick={removeHandler}
            className="flex group flex-row justify-center items-center rounded-full border border-red-500 bg-black bg-opacity-50 text-neutral-100 bg-transparent transition-all hover:bg-red-500 hover:text-neutral-900 hover:border-red-500"
          >
            <div className="flex flex-row space-x-1 justify-center items-center pl-4 pr-4 pt-1 pb-1 border-none text-lg font-medium">
              <p className="text-red-500 group-hover:text-red-900 transition-all">
                <SlUserUnfollow />
              </p>
              <p className="hidden lg:flex">Remove</p>
            </div>
          </button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default FollowerFollowingItem;