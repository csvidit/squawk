import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactionButton from "./ReactionButton";
import styles from "./PostCard.module.scss";

const PostCard = () => {
  const postcardRun = () => {
    console.log("Run");
  };



  return (
    <motion.div
      className={
        "flex flex-col rounded-2xl bg-black w-96 z-10 border-2 border-lime-500 select-none scale-50 lg:scale-100 border-t-0 " +
        styles.post_shadow
      }
      animate={{translateY: [-10, 10, -10], transition: {type: "tween", ease: "easeInOut", duration: 3.5, repeat: Infinity}}}
    >
      <motion.div className="w-full flex flex-col justify-center self-center items-center bg-lime-500 rounded-t-2xl p-4">
        <p className="text-center text-black text-3xl">jessica</p>
        <p className="text-center text-black font-light text-xs">2h ago</p>
      </motion.div>
      <motion.div className="flex flex-row pb-4 items-center justify-center">
        <Image
          src="/unsplash-1-sq.jpg"
          alt="Vidit Khandelwal"
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
