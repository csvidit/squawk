import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";

const MainContent = (props: { children: any }) => {
  return (
    <section
      id="main-content"
      data-scroll
      className={
        "w-screen h-screen flex flex-col bg-transparent justify-center items-center scroll-smooth"
      }
    >
      <div className="flex flex-col justify-end items-end space-y-0 transform -rotate-6 select-none">
        <h1 className="text-bold text-lime-500 text-6xl lg:text-8xl flex flex-row items-center">
          <motion.div className="flex flex-row items-center">
            <motion.span>s</motion.span>
            <motion.span>q</motion.span>
            <motion.span>u</motion.span>
            <motion.span>a</motion.span>
            <motion.span>w</motion.span>
            <motion.span>k</motion.span>
          </motion.div>
          <motion.div className="ml-8 flex flex-row items-center">
            {/* <motion.span>s</motion.span>
            <motion.span>o</motion.span>
            <motion.span>c</motion.span>
            <motion.span>i</motion.span>
            <motion.span>a</motion.span>
            <motion.span>l</motion.span> */}
          </motion.div>
        </h1>
        <h2 className="text-bold text-lime-500 text-6xl lg:text-8xl">
          <motion.span>s</motion.span>
            <motion.span>o</motion.span>
            <motion.span>c</motion.span>
            <motion.span>i</motion.span>
            <motion.span>a</motion.span>
            <motion.span>l</motion.span>
        </h2>
      </div>
      {props.children}
    </section>
  );
};

export default MainContent;
