import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactionButton from "./ReactionButton";

const PostCard = (props: { src: string; date: string; caption: string}) => {
  return (
    <motion.div
      className={
        "flex flex-col rounded-2xl p-2 lg:p-4 bg-neutral-900 bg-opacity-50 w-96 z-10 select-none scale-50 lg:scale-100 border-t-0"
      }
    >
      <motion.div className="w-full flex flex-col justify-center self-center items-center bg-neutral-900 bg-opacity-50 rounded-t-2xl p-4">
        <p className="text-center text-neutral-100 text-3xl">jessica</p>
        <p className="text-center text-neutral-100 font-light text-xs">{props.date}</p>
      </motion.div>
      <motion.div className="flex flex-row pb-4 items-center justify-center">
        <Image
          unoptimized
          src={props.src}
          alt={props.caption}
          width="500"
          height="500"
          className=""
        ></Image>
      </motion.div>
      <motion.div className="w-full flex flex-row justify-center items-center space-x-5 p-4">
        <ReactionButton shadow="hover:shadow-red-300">💯</ReactionButton>
        <ReactionButton shadow="hover:shadow-green-300">🐍</ReactionButton>
        <ReactionButton shadow="hover:shadow-fuchsia-300">💅</ReactionButton>
        <ReactionButton shadow="hover:shadow-slate-300">💀</ReactionButton>
      </motion.div>
    </motion.div>
  );
};

export default PostCard;
