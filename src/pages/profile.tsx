import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import MainContainer from "@/components/MainContainer";
import MainContent from "@/components/MainContent";
import Button from "@/components/Button";
import Features from "@/components/Features";
import { HiArrowDown } from "react-icons/hi2";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import LandingNav from "@/components/LandingPage/LandingNav";
import About from "@/components/LandingPage/About";
import { InView, useInView } from "react-intersection-observer";
import Signup from "@/components/LandingPage/Signup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import MainProfileContent from "@/components/MainProfileContent";
import PostCard from "@/components/PostCard";
import NormalPostCard from "@/components/NormalPostCard";
import UserProfilePostCard from "@/components/UserProfilePostCard";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainHeader from "@/components/MainHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      setResStatus(response.status);
      const profile = await response.json();
      setUserProfile(profile[0]);
    };
    fetchProfileData();
  }, [username]);

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
        <MainHeader/>
          {/* <div className="w-10/12 rounded-full p-3 lg:p-5 flex flex-row items-center justify-between bg-lime-500 drop-shadow-md shadow-white">
              <h1 className="text-4xl lg:text-6xl rounded-full">imasnek</h1>
              <div className="flex flex-col justify-center items-center rounded-full">
                <p className="text-sm lg:text-2xl">FOLLOWING</p>
                <p className="text-2xl lg:text-4xl">43</p>
              </div>
            </div> */}
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
              <div className="flex flex-row space-x-2">
                <p className="text-4xl lg:text-6xl font-medium text-white">@</p>
                <h1 className="text-4xl lg:text-6xl font-medium ">jessica</h1>
              </div>
              <div className="flex flex-row space-x-5 items-center text-2xl lg:text-4xl">
                <div className="flex flex-row space-x-2 items-center">
                  <p className="">2</p>
                  <p className="text-white">posts</p>
                </div>
                <div className="flex flex-row space-x-2 items-center select-none">
                  <p className="text-white">/</p>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <p className="">534</p>
                  <p className="text-white">followers</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-10 justify-start grid grid-cols-3"></div> */}
          <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
            <UserProfilePostCard src={"/unsplash-1-sq.jpg"} />
            <UserProfilePostCard src={"/unsplash-2-sq.png"} />
            {/* <UserProfilePostCard />
            <UserProfilePostCard />
            <UserProfilePostCard /> */}
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();

// text-[#F08080]
