/**
 * Initialization
 * The ErrorPage component is defined as the default export of the file and represents the main component for the Error page. It displays a 404 error message along with a "Go back home" link.
 * 
 * Motion Variants
 * The baseVariants object defines the motion variants for the link's hover effect. It changes the color to "#ef4444" on hover with a smooth transition.
 * 
 * Rendering
 * The component renders a section with the following elements:
 * A heading displaying the text "Error" and "404" with some CSS transforms applied for a visual effect.
 * A motion div representing the "Go back home" link. It uses the Link component from Next.js for client-side navigation and applies the motion variants for the hover effect.
 * A paragraph at the bottom displaying the text "squawk social".
 */

import Head from "next/head";
import { Inter } from "@next/font/google";
import MainContainer from "@/components/MainContainer";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { HiArrowNarrowLeft } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const baseVariants = {
  hover: {
    color: "#ef4444",
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function ErrorPage() {
  return (
    <>
      <Head>
      <title>Error 404 - Squawk Social</title>
        <meta
          name="description"
          content="Looks like you bounced around too much. There is nothing here."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Squawk Social LLC" />
        <meta
          name="keywords"
          content="Squawk Social, fun, unserious, social media, social media platform, Gen-Z, GenZ"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="all" />

        <meta property="og:title" content="Squawk Social" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://squawk.com" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="Looks like you bounced around too much. There is nothing here."
        />
      </Head>
      <MainContainer>
        <section
          id="main-content"
          data-scroll
          className={
            "w-screen h-screen flex flex-col space-y-10 bg-transparent justify-center items-center scroll-smooth"
          }
        >
          <div className="text-lime-500">
            <h2 className="text-4xl lg:text-6xl transform -translate-x-16 rotate-6">
              Error
            </h2>
            <h1 className="text-6xl lg:text-8xl transform translate-x-16 -rotate-6">
              404
            </h1>
          </div>

          <motion.div
            className="items-center justify-center rounded-full bg-white pt-2 pb-2 pl-4 pr-4 font-medium"
            variants={baseVariants}
            whileHover="hover"
          >
            <Link href="/" className="flex flex-row space-x-1 items-center justify-center w-100 h-100">
              <HiArrowNarrowLeft />
              <p>Go back home</p>
            </Link>
          </motion.div>

          <p className="text-2xl lg:text-4xl absolute bottom-10 text-lime-500">
            squawk social
          </p>
        </section>
      </MainContainer>
    </>
  );
}
