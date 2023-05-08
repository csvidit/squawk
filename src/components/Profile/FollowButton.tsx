import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { UrlObject } from "url";
import { motion } from "framer-motion";

const FollowButton = (props: { handleClick: any }) => {
  const mainDivVariants = {
    hover: {},
    initial: {},
  };
  const primaryPVariants = {
    initial: {
      display: "flex",
      translateX: 0,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeInOut",
      },
    },
    hover: {
      display: "none",
      translateX: 10,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  const secondaryPVariants = {
    initial: {
      display: "none",
      translateX: -10,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeInOut",
      },
    },
    hover: {
      display: "flex",
      translateX: 0,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.button
      type="button"
      onClick={props.handleClick}
      variants={mainDivVariants}
      whileHover="hover"
      initial="initial"
      className="flex flex-row space-x-2 items-center w-max h-max pt-2 pb-2 pl-4 pr-4 text-lg lg:text-2xl rounded-full border border-red-400 text-red-400 bg-neutral-900 bg-opacity-50 hover:bg-red-400 hover:text-neutral-900 hover:bg-opacity-100 backdrop-blur-md hover:transform transition ease-in-out"
    >
      <p className="flex">send a follow request</p>
      <motion.p variants={primaryPVariants} className="">
        <HiArrowRight />
      </motion.p>
      <motion.p variants={secondaryPVariants} className="">
        <HiArrowRight />
      </motion.p>
    </motion.button>
  );
};

export default FollowButton;
