import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useState, Suspense } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import SettingsContent from "@/components/SettingsContent";
import { useUser } from "@auth0/nextjs-auth0/client";
import MainHeader from "@/components/MainHeader";
import ChangeUsernameDialog from "@/components/Preferences/ChangeUsernameDialog";
import MainContent from "@/components/MainContent";
import { BsDot } from "react-icons/bs";
import PreferencesItem from "@/components/Preferences/PreferencesItem";
import PreferencesItemLabel from "@/components/Preferences/PreferencesItemLabel";
import PreferencesItemValue from "@/components/Preferences/PreferencesItemValue";
import PreferencesItemChangeHandler from "@/components/Preferences/PreferencesItemChangeHandler";

gsap.registerPlugin(ScrollTrigger);

export default function Preferences() {
  const [userProfile, setUserProfile] = useState({});
  const { user, isLoading } = useUser();
  const user_id = user?.sub;

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

  const handleResetPassword = async () => {
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
  };

  const handleChangeUsername = async () => {
    const new_username = "shwnapollo";
    const fetchProfileData = async () => {
      const response = await fetch("/api/change_username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, new_username }),
      });
      const profile = await response.json();
      setUserProfile(profile[0]);
    };
    fetchProfileData();
  };

  return (
    <>
      <Head>
        <title>Preferences - Squawk Social</title>
        <meta
          name="description"
          content="Change your username and password here."
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
        <meta property="og:url" content="https://squawk.com/preferences" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="Change your username and password here."
        />
      </Head>
      <MainContainer>
        <MainContent>
          <MainHeader username={userProfile?.username} />
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-2 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-2 lg:space-y-0 lg:items-center">
              <div className="flex flex-col space-y-2">
                <h1 className="text-4xl lg:text-6xl font-medium ">
                  preferences
                </h1>
              </div>
            </div>
          </div>
          <div className="w-screen flex-grow h-full flex flex-col px-10 mt-10 space-y-10 items-center">
            <PreferencesItem>
              <PreferencesItemLabel>username</PreferencesItemLabel>
              <PreferencesItemValue>
                {userProfile?.username}
              </PreferencesItemValue>
              <ChangeUsernameDialog
                user_id={user_id}
                profileChanger={setUserProfile}
              />
            </PreferencesItem>
            <PreferencesItem>
              <PreferencesItemLabel>password</PreferencesItemLabel>
              <PreferencesItemValue>**********</PreferencesItemValue>
              <PreferencesItemChangeHandler
                changeHandler={handleResetPassword}
              />
            </PreferencesItem>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({});
