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
import Router, { useRouter } from "next/router";
import PreferencesItem from "@/components/Preferences/PreferencesItem";
import PreferencesItemLabel from "@/components/Preferences/PreferencesItemLabel";
import PreferencesItemValue from "@/components/Preferences/PreferencesItemValue";
import ChangeDefaultUsernameDialog from "@/components/Preferences/ChangeDefaultUsernameDialog";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const user_id = user?.sub;
  const [userProfile, setUserProfile] = useState({});

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
    if (userProfile?.is_complete == false) {
      return (
        <>
          <Head>
            <title>squawk components</title>
            <meta name="description" content="squawk components" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <MainContainer>
            <MainContent>
              {/* <MainHeader username={userProfile?.username} /> */}
              <div className="w-full h-full min-w-screen min-h-screen flex flex-col space-y-6 justify-center items-center">
                <div className="flex flex-row space-x-2 items-center text-6xl text-lime-500">
                  <h2 className="">welcome to squawk social!</h2>
                </div>
                <div className="flex flex-row space-x-1 items-center text-4xl">
                  <p>To continue, change your username from the default one</p>
                </div>
                <div className="w-3/4">
                  <PreferencesItem>
                    <PreferencesItemLabel>username</PreferencesItemLabel>
                    <PreferencesItemValue>
                      {userProfile.username}
                    </PreferencesItemValue>
                    <ChangeDefaultUsernameDialog
                      user_id={user_id}
                      profileChanger={setUserProfile}
                    />
                  </PreferencesItem>
                </div>
              </div>
            </MainContent>
          </MainContainer>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>squawk components</title>
            <meta name="description" content="squawk components" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
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
  } else {
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
}

// text-[#F08080]
