/**
 * Initialization
 * The Following component is defined as the default export of the file and represents the main component for the Home page. It handles the rendering of users that the authenticated user is following.
 *
 * State and Variables
 * The component defines the following state variables and variables:
 * following: Stores the list of users that the current user is following.
 * userProfile: Holds the information of the current user.
 * user, isLoading, error: Variables provided by the useUser hook from @auth0/nextjs-auth0 for handling user authentication.
 * user_id: Stores the current user's ID.
 *
 * useEffect Hook
 * The component uses the useEffect hook to fetch the current user's information and the list of users they are following when the component mounts. The getFollowers function retrieves the list of users from the server and updates the following state accordingly.
 *
 * Rendering
 * The component renders a Home page layout with the following sections:
 * A header section with the current user's username.
 * A regular header section displaying the title "following".
 * A container for the users that the current user is following, where each user is rendered using the FollowerFollowingItem component.
 *
 * getServerSideProps
 * The getServerSideProps function is used for server-side rendering and authentication. It ensures that the page is only accessible to authenticated users.
 */

import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import MainContent from "@/components/MainContent";
import { motion, useScroll } from "framer-motion";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import MainProfileContent from "@/components/MainProfileContent";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainHeader from "@/components/MainHeader";
import { useUser } from "@auth0/nextjs-auth0/client";
import FollowersContainer from "@/components/Profile/FollowersContainer";
import FollowerFollowingItem from "@/components/Profile/FollowerFollowingItem";
import RegularHeader from "@/components/RegularHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Following() {
  const [following, setFollowing] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const { user, isLoading, error } = useUser();
  const user_id = user?.sub;

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const profile = await response.json();
      setUserProfile(profile[0]);
    };
    const getFollowers = () => {
      fetch("/api/get_following", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      })
        .then((response) => response.json())
        .then((following) => {
          setFollowing(following[0].following);
        })
        .catch((error) => {
          console.error("Error fetching followers:", error);
        });
    };
    getFollowers();
    getCurrentUser();
  }, [user_id]);

  return (
    <>
      <Head>
        <title>Following - Squawk Social</title>
        <meta
          name="description"
          content="See who you are following on Squawk Social"
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
        <meta property="og:url" content="https://squawk.com/following" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="See who you are following on Squawk Social"
        />
      </Head>
      <MainContainer>
        <MainContent>
          <MainHeader username={userProfile?.username} />
          <RegularHeader>
            <div className="flex flex-row space-x-2">
              <h1 className="text-4xl lg:text-6xl font-medium ">following</h1>
            </div>
          </RegularHeader>
          {/* <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
              
            </div>
          </div> */}
          <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
            <FollowersContainer>
              {following.map((x, index) => (
                <FollowerFollowingItem
                  type="following"
                  key={index}
                  currentUser={user_id}
                  selectedUser={x}
                />
              ))}
            </FollowersContainer>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();

// text-[#F08080]
