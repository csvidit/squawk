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
import LandingNav from "@/components/LandingPage/LandingNav";
import About from "@/components/LandingPage/About";
import { InView, useInView } from "react-intersection-observer";
import Signup from "@/components/LandingPage/Signup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
// import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import HeroContent from "@/components/LandingPage/HeroContent";
import MainHeader from "@/components/MainHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { user, error, isLoading } = useUser();

  const user_id = user?.sub;

  const [userProfile, setUserProfile] = useState({});
  const [resStatus, setResStatus] = useState(500);

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const profile = await response.json();
      setUserProfile(profile[0]);
    };
    fetchProfileData();
  }, [user_id]);

  if (isLoading) return <p>Loading</p>;
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
          <MainContent>
            <MainHeader username={userProfile?.username} />
            <div className="w-full h-full min-w-screen min-h-screen flex flex-row justify-center items-center">
              <h1 className="text-4xl">HOMEPAGE</h1>
            </div>
          </MainContent>
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
        <HeroContent />
        <About></About>
        <Features></Features>
        <Signup></Signup>
        <LandingNav></LandingNav>
      </MainContainer>
    </>
  );
}

// text-[#F08080]
