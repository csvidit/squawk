import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import MainProfileContent from "@/components/MainProfileContent";
import UserProfilePostCard from "@/components/UserProfilePostCard";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainHeader from "@/components/MainHeader";
import supabase from "@/supabase/supabase";

gsap.registerPlugin(ScrollTrigger);

const Profile = (props: { user: UserProfile, data: any}) => {
  const [userProfile, setUserProfile] = useState({});
  const [resStatus, setResStatus] = useState(500);
  const router = useRouter();
  const { username } = router.query;

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
        <MainProfileContent>
          <MainHeader />
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
              <div className="flex flex-row space-x-2">
                <p className="text-4xl lg:text-6xl font-medium text-white">@</p>
                <h1 className="text-4xl lg:text-6xl font-medium ">
                  {username}
                </h1>
                <p>{props.data}</p>
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
        </MainProfileContent>
      </MainContainer>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // const session = getSession(context.req, context.res);
    const username = context.query.username;
    console.log(username)
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("username", username);

    if (error || data.length == 0) {
        console.log(data)
      return{
        notFound: true
      }
    }
    console.log(data)
    return {
      props: data[0]
    };
  },
});

export default Profile;
