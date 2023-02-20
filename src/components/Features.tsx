import React from "react";
import styles from "./Features.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

const Features = () => {
  const scroller = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  // const features = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const features = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    let featuresList = gsap.utils.toArray(".features");

    let to = gsap.to(featuresList, {
      xPercent: () => -100 * (featuresList.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (featuresList.length - 1),

        end: () => "+=" + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden flex">
      <div className="overflow-hidden ">
        <div
          id="skills"
          ref={scroller}
          className="landing_features flex overflow-x-hidden text-white w-[400vw] m-0 relative h-screen"
        >
          <motion.section
            ref={features}
            className="features px-12 w-screen h-full bg-transparent flex flex-col justify-center items-center z-50"
          >
            <h2 className="font-medium text-6xl text-lime-500">
              sick new reactions
            </h2>
            <div className="flex flex-row items-center space-x-4 font-light text-4xl text-zinc-300 mt-4">
              <p>choose from</p>
              <p>💯</p>
              <p>🐍</p>
              <p>💅🏽</p>
              <p>💀</p>
            </div>
          </motion.section>
          <motion.section
            ref={features}
            className="features px-12 w-screen h-full bg-transparent flex flex-col justify-center items-center z-50"
          >
            <h2 className="font-medium text-6xl text-lime-500">equitable</h2>
            <p className="font-light text-4xl text-zinc-300 mt-4">
              newest posts show first. simple.
            </p>
          </motion.section>
          <motion.section
            ref={features}
            className="features px-12 w-screen h-full bg-transparent flex flex-col justify-center items-center z-50"
          >
            <h2 className="font-medium text-6xl text-lime-500">drama-free</h2>
            <div className="font-light text-4xl text-zinc-300 mt-4 flex flex-col">
              <p className="flex">never worry about your ratio again,</p>
              <p className="flex">cuz it ain&apos;t public</p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

{
  /* <section
      data-scroll
      id="features"
      className={
        "w-screen h-screen flex flex-col justify-center items-center scroll-smooth " +
        styles.landing_features
      }
    >
      <div className="flex flex-col m-10">
        <div className="flex flex-col transform -translate-x-10 -translate-y-16 rotate-6 self-center">
          <h2 className="font-medium text-6xl text-lime-500">
            sick new reactions
          </h2>
          <div className="flex flex-row items-center space-x-4 font-light text-4xl text-zinc-300 mt-4">
            <p>choose from</p>
            <p>💯</p>
            <p>🐍</p>
            <p>💅🏽</p>
            <p>💀</p>
          </div>
        </div>
        <div className="flex flex-col transform translate-x-28 -rotate-6 self-center mt-10">
          <h2 className="font-medium text-6xl text-lime-500">equitable</h2>
          <p className="font-light text-4xl text-zinc-300 mt-4">
            newest posts show first. simple.
          </p>
        </div>
        <div className="flex flex-col transform -translate-x-28 rotate-6 self-center mt-10">
          <h2 className="font-medium text-6xl text-lime-500 mt-10">
            drama-free
          </h2>
          <div className="font-light text-4xl text-zinc-300 mt-4 flex flex-col justify-end items-end">
            <p className="flex">never worry about your ratio again,</p>
            <p className="flex">cuz it ain&apos;t public</p>
          </div>
        </div>
      </div>
    </section> */
}

// return (
//     <section
//       ref={scroller}
//       data-scroll
//       id="features"
//       className={
//         "w-screen h-full flex flex-col justify-center items-center scroll-smooth overflow-hidden " +
//         styles.landing_features
//       }
//     >
//       <div
//         className="features flex flex-col justify-center items-center w-screen h-screen"
//         ref={reactions}
//       >
//         <h2 className="font-medium text-6xl text-lime-500">
//           sick new reactions
//         </h2>
//         <div className="flex flex-row items-center space-x-4 font-light text-4xl text-zinc-300 mt-4">
//           <p>choose from</p>
//           <p>💯</p>
//           <p>🐍</p>
//           <p>💅🏽</p>
//           <p>💀</p>
//         </div>
//       </div>
//       <div
//         className="features flex flex-col justify-center items-center self-start mt-10 w-screen h-screen"
//         ref={equitable}
//       >
//         <h2 className="font-medium text-6xl text-lime-500">equitable</h2>
//         <p className="font-light text-4xl text-zinc-300 mt-4">
//           newest posts show first. simple.
//         </p>
//       </div>
//       <div
//         className="features flex flex-col justify-center items-center mt-10 w-screen h-screen"
//         ref={ratio}
//       >
//         <h2 className="font-medium text-6xl text-lime-500">drama-free</h2>
//         <div className="font-light text-4xl text-zinc-300 mt-4 flex flex-col">
//           <p className="flex">never worry about your ratio again,</p>
//           <p className="flex">cuz it ain&apos;t public</p>
//         </div>
//       </div>
//     </section>
//   );

export default Features;
