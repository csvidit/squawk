import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import LandingNavButton from "./LandingNavButton";
import Button from "./Button";
import { HiOutlineLogin } from "react-icons/hi";

const MainContent = (props: { children: any }) => {
  return (
    <section
      id="main-content"
      data-scroll
      className={
        "w-screen h-full min-h-screen flex flex-col bg-transparent scroll-smooth text-white"
      }
    >
      {props.children}
    </section>
  );
};

export default MainContent;
