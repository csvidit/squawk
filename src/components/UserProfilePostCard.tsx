import Image from "next/image";
import { Suspense } from "react";
import ReactionButton from "./ReactionButton";

const UserProfilePostCard = (props: {
  src: string;
  date: string;
  caption: string;
}) => {
  return (
    <div className="rounded-2xl bg-black bg-opacity-50 w-10/12 p-2 lg:p-4 flex flex-col lg:flex-row justify-center items-center">
      <div className="">
        <Suspense>
          <Image
            unoptimized
            src={props.src}
            alt="Vidit Khandelwal"
            width="500"
            height="500"
            className="rounded-md"
          ></Image>
        </Suspense>
      </div>
      <div className="flex flex-col justify-between lg:ml-10 text-2xl lg:text-4xl">
      <div className="text-xl lg:text-2xl text-violet-500 mb-10">
          <p className="">posted on {props.date}</p>
        </div>
        <div className="text-xl lg:text-2xl text-red-400 mb-10">
          <p className="">{props.caption}</p>
        </div>
        <div className="flex flex-col space-y-10 text-lime-500">
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">kavz</p>
            <p className="flex text-white">and</p>
            <p>5</p>
            <p className="flex text-white">others gave you 💯</p>
          </div>
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">shwnapollo</p>
            <p className="flex text-white">and</p>
            <p>47</p>
            <p className="flex text-white">others gave you 💅🏽</p>
          </div>
          <div className="flex flex-row space-x-2 items-center flex-wrap">
            <p className="flex">tayloralwyn</p>
            <p className="flex text-white">and</p>
            <p>276</p>
            <p className="flex text-white">others gave you 🐍</p>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <ReactionButton shadow="hover:shadow-red-300">💯</ReactionButton>
            <ReactionButton shadow="hover:shadow-green-300">🐍</ReactionButton>
            <ReactionButton shadow="hover:shadow-fuchsia-300">
              💅
            </ReactionButton>
            <ReactionButton shadow="hover:shadow-slate-300">💀</ReactionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePostCard;
