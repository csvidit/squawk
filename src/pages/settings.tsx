import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import MainProfileContent from "@/components/MainProfileContent";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import SettingsContent from "@/components/SettingsContent";
import { useUser } from "@auth0/nextjs-auth0/client";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [userProfile, setUserProfile] = useState({});
  const { user, isLoading, error } = useUser();
  const user_id = user?.sub;

  async function handleResetPassword() {
    const email = user?.email; // Replace with user's email
    const response = await fetch("/api/reset_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      alert("Password reset email sent.");
    } else {
      alert("Failed to send password reset email.");
    }
  }

  if (Object.keys(userProfile).length === 0){
    getUserProfile();
  }

    async function getUserProfile() {
    //   const response = await fetch("/api/user_profile", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ user_id }),
    //   }).then((response) => setUserProfile(response));
    const response = await fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      if(response.ok)
      {
        setUserProfile(response);
      }
    }

  //   getUserProfile();

  return (
    <>
      <Head>
        <title>squawk components</title>
        <meta name="description" content="squawk components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <SettingsContent>
          <ProfileHeader />
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-2 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-2 lg:space-y-0 lg:items-center">
              <div className="flex flex-col space-y-2">
                <p className="text-xl lg:text-2xl font-medium text-white">
                  {JSON.stringify(userProfile)}
                </p>
                <h1 className="text-4xl lg:text-6xl font-medium ">settings</h1>
              </div>
            </div>
          </div>
          <div className="w-screen h-full flex flex-row items-center justify-center space-x-10 flex-wrap">
            <div className="flex flex-col justify-between space-y-2 bg-black bg-opacity-50 border w-60 h-80 border-lime-500 rounded-2xl">
              <div className="flex flex-col space-y-2 p-4">
                <p className="text-2xl lg:text-4xl text-lime-500">username</p>
                <p className="text-xl lg:text-2xl text-white">benji</p>
              </div>
              <div className="flex flex-row space-x-2">
                <button className="w-full h-14 rounded-b-2xl bg-lime-500">
                  change username
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-2 bg-black bg-opacity-50 border w-60 h-80 border-lime-500 rounded-2xl">
              <div className="flex flex-col space-y-2 p-4">
                <p className="text-2xl lg:text-4xl text-lime-500">password</p>
                <p className="text-xl lg:text-2xl text-white">**********</p>
              </div>
              <div className="flex flex-row space-x-2">
                <button
                  onClick={handleResetPassword}
                  className="w-full h-14 rounded-b-2xl bg-lime-500"
                >
                  change password
                </button>
              </div>
            </div>
          </div>
        </SettingsContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
