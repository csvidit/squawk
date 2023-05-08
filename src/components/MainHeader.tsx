import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  HiOutlineWrenchScrewdriver,
  HiOutlineUserCircle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { motion, useScroll } from "framer-motion";
import LandingNavButton from "./LandingNavButton";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import NewPostHeaderButton from "./NewPostHeaderButton";

const iconVariants = {
  hover: {
    rotate: 0,
    transition: { duration: 0.5, type: "spring", ease: "easeInOut" },
  },
};

const MainHeader = (props: {username: string}) => {

  return (
    <motion.div className="w-10/12 bg-neutral-100 rounded-full z-10 fixed drop-shadow-md shadow-white self-center top-12 flex flex-row pt-2 pb-2 pl-4 pr-4 space-x-1 justify-between items-center font-medium text-sm lg:text-lg">
      <motion.div className="flex flex-row self-center space-x-1">
        <Link href="/" className="text-violet-700 ">
          squawk social
        </Link>
      </motion.div>
      <motion.div className="bg-transparent flex flex-row space-x-4 opacity-100 -z-10">
        <NewPostHeaderButton/>
        <LandingNavButton href="/search">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineMagnifyingGlass />
          </motion.div>
          <p className="hidden lg:flex">Search</p>
        </LandingNavButton>
        <LandingNavButton href={"/user/"+props.username}>
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineUserCircle />
          </motion.div>
          <p className="hidden lg:flex">Profile</p>
        </LandingNavButton>
        <LandingNavButton href="/preferences">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineWrenchScrewdriver />
          </motion.div>
          <p className="hidden lg:flex">Preferences</p>
        </LandingNavButton>
        <LandingNavButton href="/api/auth/logout">
          <motion.div
            className="self-center justify-center items-center"
            variants={iconVariants}
          >
            <HiOutlineLogout />
          </motion.div>
          <p className="hidden lg:flex">Sign Out</p>
        </LandingNavButton>
      </motion.div>
    </motion.div>
  );
};

export default MainHeader;
