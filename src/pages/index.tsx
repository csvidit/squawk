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
import Signup from "@/components/Signup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import {useRef, useEffect} from "react"


gsap.registerPlugin(ScrollTrigger);


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
            {/* <motion.div animate={{y: [0, 15, 0]}} transition={{repeat: Infinity, type: "spring", duration: 2}} className="flex flex-row absolute bottom-10 text-white text-4xl">
            <Link href="#features"><HiArrowDown/></Link>
          </motion.div> */}
          </MainContent>
          <About></About>
          <Features></Features>
          <Signup></Signup>
          <LandingNav></LandingNav>
      </MainContainer>
    </>
  );
}

// text-[#F08080]
