/**
 * Initialization
 * The FollowRequests component is defined as the default export of the file and represents the main component for the Home page. It handles the rendering of follow requests for the authenticated user.
 * 
 * State and Variables
 * The component defines the following state variables and variables:
 * followRequests: Stores the list of follow requests.
 * userProfile: Holds the information of the current user.
 * user, isLoading, error: Variables provided by the useUser hook from @auth0/nextjs-auth0 for handling user authentication.
 * user_id: Stores the current user's ID.
 * type: Represents the type of follow requests (in this case, "incoming").
 * 
 * useEffect Hook
 * 
 * The component uses the useEffect hook to fetch the current user's information and follow requests when the component mounts. The getFollowRequests function retrieves the follow requests from the server and updates the followRequests state accordingly.
 * 
 * Rendering
 * The component renders a Home page layout with the following sections:
 * A header section with the current user's username.
 * A section for displaying the follow requests.
 * A container for the follow requests, where each follow request is rendered using the FollowRequestItem component.
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
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import SearchResultsContainer from "@/components/SearchResultsContainer";
import SearchResult from "@/components/SearchResult";
import FollowRequestsContainer from "@/components/Profile/FollowRequestsContainer";
import FollowRequestItem from "@/components/Profile/FollowRequestItem";

gsap.registerPlugin(ScrollTrigger);

export default function FollowRequests() {
  const [followRequests, setFollowRequests] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const { user, isLoading, error } = useUser();
  const user_id = user?.sub;
  const type = "incoming";

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
    // const getFollowRequests = async () => {
    //   const response = await fetch("/api/get_follow_requests", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ user_id, type}),
    //   });
    //   const requests = await response.json();
    //   setFollowRequests(requests);
    // };
    const getFollowRequests = () => {
      fetch("/api/get_follow_requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, type }),
      })
        .then((response) => response.json())
        .then((requests) => {
          setFollowRequests(requests);
        })
        .catch((error) => {
          console.error("Error fetching follow requests:", error);
        });
    };    
    getFollowRequests();
    getCurrentUser();
  }, [user_id]);

  return (
    <>
      <Head>
      <title>Follow Requests - Squawk Social</title>
        <meta
          name="description"
          content="See who's trying to follow you on Squawk."
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
        <meta property="og:url" content="https://squawk.com/follow-requests" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="See who's trying to follow you on Squawk."
        />
      </Head>
      <MainContainer>
        <MainContent>
          <MainHeader username={userProfile?.username} />
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
              <div className="flex flex-row space-x-2">
                <h1 className="text-4xl lg:text-6xl font-medium ">follow requests</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
            <FollowRequestsContainer>
              {followRequests.map((x, index) => <FollowRequestItem key={index} index={index} request={x} allRequests={followRequests} requestsStateChanger={setFollowRequests}/>)}
            </FollowRequestsContainer>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();

// text-[#F08080]
