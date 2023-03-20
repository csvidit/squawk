import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useState, Suspense } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import SettingsContent from "@/components/SettingsContent";
import { useUser } from "@auth0/nextjs-auth0/client";
import MainHeader from "@/components/MainHeader";
import ChangeUsernameDialog from "@/components/Preferences/ChangeUsernameDialog";

const ProfileCreation = () => {
//   const [userProfile, setUserProfile] = useState({});
//   const { user, isLoading } = useUser();
//   const user_id = user?.sub;

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const response = await fetch("/api/user_profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id }),
//       });
//       const profile = await response.json();
//       setUserProfile(profile[0])
//     }
//     fetchProfileData()
//   }, [user_id]);

//   const handleChangeUsername = async () => {
//     const new_username = 'shwnapollo'
//     const fetchProfileData = async () => {
//       const response = await fetch("/api/change_username", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id, new_username}),
//       });
//       const profile = await response.json();
//       setUserProfile(profile[0])
//     }
//     fetchProfileData()
//   }

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
          <MainHeader/>
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-2 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-2 lg:space-y-0 lg:items-center">
              <div className="flex flex-col space-y-2">
                {/* <p className="text-xl lg:text-2xl font-medium text-white">
                  <Suspense>{userProfile?.username}</Suspense>
                </p> */}
                <h1 className="text-4xl lg:text-6xl font-medium ">preferences</h1>
              </div>
            </div>
          </div>
          <div className="w-screen h-full flex flex-col lg:flex-row items-center justify-center space-x-0 space-y-10 lg:space-y-0 lg:space-x-10 flex-wrap">
            <div className="flex flex-col justify-between space-y-2 bg-black bg-opacity-50 border w-60 h-80 border-lime-500 rounded-2xl">
              <div className="flex flex-col space-y-2 p-4">
                <p className="text-2xl lg:text-4xl text-lime-500">username</p>
                <p className="text-xl lg:text-2xl text-white">{userProfile?.username}</p>
              </div>
              <div className="flex flex-row space-x-2">
              <ChangeUsernameDialog profileChanger={setUserProfile} user_id={user_id}/>
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
                  className="w-full h-14 rounded-b-2xl bg-lime-500 text-black"
                >
                  change password
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-2 bg-black bg-opacity-50 border w-60 h-80 border-lime-500 rounded-2xl">
              <div className="flex flex-col space-y-2 p-4">
                <p className="text-2xl lg:text-4xl text-lime-500">accent color</p>
                <p className="text-xl lg:text-2xl text-white">{userProfile?.accent_color}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <button
                  onClick={handleResetPassword}
                  className="w-full h-14 rounded-b-2xl bg-lime-500 text-black"
                >
                  change accent color
                </button>
              </div>
            </div>
          </div>
        </SettingsContent>
      </MainContainer>
    </>
  );
}

export default ProfileCreation;

export const getServerSideProps = withPageAuthRequired();
