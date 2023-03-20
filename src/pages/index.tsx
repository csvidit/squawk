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
import { useRef, useEffect, useState } from "react";
// import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useUser, } from "@auth0/nextjs-auth0/client";
import HomeContent from "@/components/HomeContent";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const supabaseClient = useSupabaseClient();
  const { user, error, isLoading } = useUser();

  if (isLoading) return (<p>Loading</p>);
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>squawk components</title>
          <meta name="description" content="squawk components" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainContainer>
          <HomeContent>
            <h1 className="text-4xl lg:text-6xl font-medium text-white">
              HOMEPAGE
            </h1>
            <Link href="/api/auth/logout" className="text-white">
              Logout
            </Link>
          </HomeContent>
        </MainContainer>
      </>
    );
  }
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
