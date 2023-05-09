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

export default function Home() {
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
        <title>squawk components</title>
        <meta name="description" content="squawk components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
