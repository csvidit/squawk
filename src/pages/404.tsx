import Head from "next/head";
import { Inter } from "@next/font/google";
import MainContainer from "@/components/MainContainer";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { HiArrowNarrowLeft } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  return (
    <>
      <Head>
        <title>squawk components</title>
        <meta name="description" content="squawk components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
