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
import LandingNavButton from "./LandingNavButton";

const LandingNav = () => {
  return (
    <motion.div className="rounded-full z-10 fixed drop-shadow-md shadow-white self-center bottom-12 flex flex-row pt-2 pb-2 pl-4 pr-4 bg-zinc-200 space-x-1 items-center font-sans font-medium text-md">
      <LandingNavButton href="#">
        <HiOutlineStar />
        <p>Intro</p>
      </LandingNavButton>
      <LandingNavButton href="#about">
        <BsInfoCircle />
        <p>About</p>
      </LandingNavButton>
      <LandingNavButton href="#features">
        <HiOutlineSparkles />
        <p>Features</p>
      </LandingNavButton>
      <LandingNavButton href="#signup">
        <HiOutlineCursorArrowRays />
        <p>Sign Up</p>
      </LandingNavButton>
    </motion.div>
  );
};

export default LandingNav;
