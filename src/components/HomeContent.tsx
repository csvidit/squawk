import React from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";
import MainHeader from "./MainHeader";

const HomeContent = (props: { children: any }) => {
  return (
    <section
      id="main-content"
      data-scroll
      className={
        "w-screen h-screen flex flex-col bg-transparent justify-center items-center scroll-smooth"
      }
    >
        <MainHeader/>
      {props.children}
    </section>
  );
};

export default HomeContent;
