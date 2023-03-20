import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UrlObject } from "url";

const baseVariants = {
    hover: {
      color: "#ef4444",
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

const Button = (props: { href: string | UrlObject; children: any }) => {
  return (
    <Link href={props.href} className="mt-10">
      <motion.div variants={baseVariants} whileHover="hover" className="pt-2 pb-2 pl-4 pr-4 bg-zinc-100 rounded-full drop-shadow-md shadow-white self-center flex flex-row space-x-1 justify-center items-center font-medium text-sm lg:text-lg">
        <div className="flex flex-row space-x-1 items-center">{props.children}</div>
      </motion.div>
    </Link>
  );
};

export default Button;
