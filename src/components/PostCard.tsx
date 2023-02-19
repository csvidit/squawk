import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PostCard = () => {

    const postcardRun = () =>
{
    console.log("Run")
}

  return (
    <motion.div className="flex flex-col rounded-2xl bg-black p-4 w-96 z-10 border-2 border-lime-500 select-none">
      <motion.div className="w-full flex flex-row items-center justify-center space-x-2">
        <p className="text-center text-zinc-200 font-sans font-medium">viditkhandelwal</p>
        <p className="text-center text-zinc-200 font-sans font-light text-xs">2h ago</p>
      </motion.div>
      <motion.div className="flex flex-row p-4 items-center justify-center rounded-2xl">
        <Image
          src="/vidit.jpg"
          alt="Vidit Khandelwal"
          width="300"
          height="300"
        ></Image>
      </motion.div>
      <motion.div className="w-full flex flex-row justify-center items-center space-x-5">
        <motion.a whileHover={{rotateX: 25}} className="bg-zinc-200 w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg hover:shadow-red-300">💯</motion.a>
        <motion.a whileHover={{rotateX: 25}} className="bg-zinc-200 w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg hover:shadow-green-300">🐍</motion.a>
        <motion.a whileHover={{rotateX: 25}} className="bg-zinc-200 w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg hover:shadow-fuchsia-300">💅</motion.a>
        <motion.a whileHover={{rotateX: 25}} className="bg-zinc-200 w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg hover:shadow-slate-300">💀</motion.a>
      </motion.div>
    </motion.div>
  );
};

export default PostCard;
