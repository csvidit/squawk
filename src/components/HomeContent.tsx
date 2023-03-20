import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";
import HomeHeader from "./HomeHeader";

const HomeContent = (props: { children: any }) => {
  return (
    <section
      id="main-content"
      data-scroll
      className={
        "w-screen h-screen flex flex-col bg-transparent justify-center items-center scroll-smooth"
      }
    >
        <HomeHeader/>
      {props.children}
    </section>
  );
};

export default HomeContent;
