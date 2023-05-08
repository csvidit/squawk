import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineQuestionMarkCircle,
  HiOutlineCursorArrowRays,
  HiOutlineStar,
} from "react-icons/hi2";
import { BsInfoCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";
import LandingNavButton from "../LandingNavButton";

const iconVariants = {
  hover: {
    rotate: 45,
    transition: { duration: 0.5, type: "spring", ease: "easeInOut"},
  },
};

const LandingNav = () => {
  return (
    <motion.div className="bg-zinc-100 rounded-full z-10 fixed drop-shadow-md shadow-white self-center bottom-12 flex flex-row pt-2 pb-2 pl-4 pr-4 space-x-1 items-center font-medium text-md">
      <motion.div className="bg-transparent flex flex-row space-x-1 opacity-100 -z-10">
        <LandingNavButton href="#">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineStar />
          </motion.div>
          <p>Intro</p>
        </LandingNavButton>
        <LandingNavButton href="#about">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <BsInfoCircle />
          </motion.div>
          <p>About</p>
        </LandingNavButton>
        <LandingNavButton href="#features">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineSparkles />
          </motion.div>
          <p>Features</p>
        </LandingNavButton>
        <LandingNavButton href="#signup">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineCursorArrowRays />
          </motion.div>
          <p>Sign Up</p>
        </LandingNavButton>
      </motion.div>
    </motion.div>
  );
};

export default LandingNav;
