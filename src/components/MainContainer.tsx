import React from "react";
import localFont from "@next/font/local";
import styles from "./MainContainer.module.scss";

const myFont = localFont({ src: "../fonts/Chromatica-Bold.woff" });

const chromatica = localFont({
  src: [
    {
      path: "../fonts/Chromatica-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Chromatica-Bold.woff",
      weight: "700",
      style: "bold",
    },
  ],
});

const MainContainer = (props: { children: any }) => {
  return (
    <main
      data-scroll-section
      className={
        "relative w-full h-full flex flex-col scroll-smooth " +
        myFont.className +
        " " +
        styles.main_container
      }
    >
      {props.children}
    </main>
  );
};

export default MainContainer;
