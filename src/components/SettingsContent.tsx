import React, { MutableRefObject, useRef } from "react";
import styles from "./MainContent.module.scss";
import { motion } from "framer-motion";

const SettingsContent = (props: { children: any}) => {

  return (
    <section
      id="main-content"
      data-scroll
      className={
        "w-screen h-screen flex flex-col bg-transparent items-center text-white scroll-smooth"
      }
    >
      {props.children}
    </section>
  );
};

export default SettingsContent;

