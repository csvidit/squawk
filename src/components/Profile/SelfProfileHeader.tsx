import Link from "next/link";
import FollowRequestsButton from "./FollowRequestsButton";

const SelfProfileHeader = (props: {
  username: string;
  numPosts: number;
  followers: number;
  following: number;
}) => {
  return (
    <div className="w-screen flex flex-col items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
      <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
        <div className="flex flex-row space-x-2">
          <p className="text-4xl lg:text-6xl font-medium text-white">@</p>
          <h1 className="text-4xl lg:text-6xl font-medium ">
            {props.username}
          </h1>
        </div>
        <div className="flex flex-row space-x-5 items-center text-2xl lg:text-4xl">
          <div className="flex flex-row space-x-2 items-center">
            <p className="">{props.numPosts}</p>
            <p className="text-white">{props.numPosts == 1 ? "post" : "posts"}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center select-none">
            <p className="text-white">/</p>
          </div>
          <Link href="/followers" className="flex flex-col items-center space-y-1 relative group">
            <div className="flex flex-row space-x-2 items-center z-10">
              <p className="group-hover:text-neutral-900 transition-all">{props.followers}</p>
              <p className="text-white group-hover:text-neutral-900 transition-all">{props.followers == 1 ? "follower" : "followers"}</p>
            </div>
            <div className="absolute bottom-0 bg-red-400 h-[2px] group-hover:rounded-xl group-hover:h-[110%] group-hover:w-[110%] transition-all w-full"></div>
          </Link>
          <div className="flex flex-row space-x-2 items-center select-none">
            <p className="text-white">/</p>
          </div>
          <Link href="/following" className="flex flex-col items-center space-y-1 relative group">
            <div className="flex flex-row space-x-2 items-center z-10">
              <p className="group-hover:text-neutral-900 transition-all">{props.following}</p>
              <p className="text-white group-hover:text-neutral-900 transition-all">following</p>
            </div>
            <div className="absolute bottom-0 bg-red-400 h-[2px] group-hover:rounded-xl group-hover:h-[110%] group-hover:w-[110%] transition-all w-full"></div>
          </Link>
        </div>
      </div>
      <div className="px-3 pb-3 lg:px-5 lg:pb-5 flex flex-row w-10/12 space-x-3 lg:space-x-5 justify-end items-center">
        <FollowRequestsButton />
      </div>
    </div>
  );
};

export default SelfProfileHeader;
