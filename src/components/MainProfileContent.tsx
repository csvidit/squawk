import React, { MutableRefObject, useRef } from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";

const MainProfileContent = (props: { children: any , ref: MutableRefObject<null>}) => {

  return (
    <section
      ref={props.ref}
      id="main-content"
      data-scroll
      className={
        "w-screen h-full flex flex-col bg-transparent items-center scroll-smooth"
      }
    >
      {props.children}
    </section>
  );
};

export default MainProfileContent;

