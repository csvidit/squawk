import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import MainContainer from "@/components/MainContainer";
import MainContent from "@/components/MainContent";
import Button from "@/components/Button";
import Features from "@/components/Features";
import { HiArrowDown } from "react-icons/hi2";
import { motion } from "framer-motion";
import Link from "next/link";
import LandingNav from "@/components/LandingNav";
import About from "@/components/About";
import { InView, useInView } from "react-intersection-observer";


const inter = Inter({ subsets: ["latin"] });

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
          <MainContent>
            <div className="flex flex-col justify-end items-end space-y-0 transform -rotate-6 select-none">
              <h1 className="text-bold text-lime-500 text-6xl lg:text-8xl">
                squawk social
              </h1>
              <h2 className="text-bold text-lime-500 text-2xl lg:text-4xl">
                spread your waves
              </h2>
            </div>
            {/* <motion.div animate={{y: [0, 15, 0]}} transition={{repeat: Infinity, type: "spring", duration: 2}} className="flex flex-row absolute bottom-10 text-white text-4xl">
            <Link href="#features"><HiArrowDown/></Link>
          </motion.div> */}
          </MainContent>
          <About></About>
          <Features></Features>
          <LandingNav></LandingNav>
      </MainContainer>
    </>
  );
}

// text-[#F08080]
