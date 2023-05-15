/**
 * Button used in the new-post route. Handles submission of post through a clickHandler passed as a prop.
 */

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { UrlObject } from "url";
import { motion } from "framer-motion";

const ButtonSubmitPost = (props: { handleSubmit: any }) => {
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
      onClick={props.handleSubmit}
      variants={mainDivVariants}
      whileHover="hover"
      initial="initial"
      className="flex flex-row space-x-2 items-center w-max h-max pt-4 pb-4 pl-6 pr-6 text-lg lg:text-2xl rounded-full border border-lime-500 text-lime-500 bg-neutral-900 bg-opacity-50 hover:bg-lime-500 hover:text-neutral-900 hover:bg-opacity-100 backdrop-blur-md hover:transform transition ease-in-out"
    >
      <p className="flex">post it!</p>
      <motion.p variants={primaryPVariants} className="">
        <HiArrowRight />
      </motion.p>
      <motion.p variants={secondaryPVariants} className="">
        <HiArrowRight />
      </motion.p>
    </motion.button>
  );
};

export default ButtonSubmitPost;
