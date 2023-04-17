import { BsPencilFill } from "react-icons/bs";
import { motion } from "framer-motion";
import styles from "./NewPostButton.module.scss";
import Image from "next/image";

const mainDivVariants = {
  hover: {
    boxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    webkitBoxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    mozBoxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
  initial: {
    boxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    webkitBoxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    mozBoxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
};
const iconVariants = {
  initial: {
    color: "#171717",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
  hover: {
    color: "#0284c7",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
};
const primaryPVariants = {
  initial: {
    display: "flex",
    translateY: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
  hover: {
    display: "none",
    translateY: 10,
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
    translateY: -10,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
  hover: {
    display: "flex",
    translateY: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const NewPostButton = (props: { userID: string }) => {
  return (
    <div className="z-10 fixed bottom-12 w-10/12 flex flex-row self-center justify-end items-center">
      <motion.button
        variants={mainDivVariants}
        initial="initial"
        whileHover="hover"
        type="button"
        className={"flex flex-row space-x-2 justify-center items-center bg-lime-500 drop-shadow-md rounded-full pt-4 pb-4 pl-6 pr-6 text-lg lg:text-2xl "+styles.button}
      >
        {/* <motion.p variants={primaryPVariants} className="">
          <BsPencilFill />
        </motion.p> */}
        {/* <motion.p>
            <Image src="/eye.svg" width={25} height={25} alt="Smiling cartoon face"/>
        </motion.p> */}
        <motion.p variants={iconVariants} className="text-neutral-900">
          <BsPencilFill />
        </motion.p>
        <p className="text-neutral-900">New Post</p>
      </motion.button>
    </div>
  );
};

export default NewPostButton;
