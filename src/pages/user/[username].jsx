import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import MainProfileContent from "@/components/MainProfileContent";
import UserProfilePostCard from "@/components/UserProfilePostCard";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainHeader from "@/components/MainHeader";
import supabase from "@/supabase/supabase";
import SelfProfile from "@/components/Profile/SelfProfile";
import OtherProfile from "@/components/Profile/OtherProfile";
import RestrictedProfile from "@/components/Profile/RestrictedProfile";
// import { Profile } from "@/interfaces/Profile";

gsap.registerPlugin(ScrollTrigger);

const Profile = (props) => {
  // const [userProfile, setUserProfile] = useState({
  //   id: 0,
  //   created_at: Date.now(),
  //   user_id: "default",
  //   username: "default",
  //   accent_color: "default",
  //   is_complete: false,
  // });
  const [searchedUser, setSearchedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const {user, isLoading, error} = useUser();
  const user_id = user?.sub;
  const [currentUser, setCurrentUser] = useState({});
  const [resStatus, setResStatus] = useState(500);
  const router = useRouter();
  const { username } = router.query;
  const criteria = "self";
  const isFollowing = searchedUser.followers == null || currentUser == undefined ? false : searchedUser.followers.includes(currentUser.user_id);

  // useEffect(() => {
  //   const getSearchedUser = async () => {
  //     const response = await fetch("/api/get_user_from_username", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username }),
  //     });
  //     setResStatus(response.status);
  //     const profile = await response.json();
  //     setSearchedUser(profile[0]);
  //   };
  //   const getCurrentUser = async () => {
  //     const response = await fetch("/api/user_profile", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ user_id }),
  //     });
  //     setResStatus(response.status);
  //     const profile = await response.json();
  //     setCurrentUser(profile[0]);
  //   };
  //   getSearchedUser();
  //   getCurrentUser();
  // }, [user_id, username]);

  useEffect(() => {
    const getSearchedUser = async () => {
      const response = await fetch("/api/get_user_from_username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      setResStatus(response.status);
      const profile = await response.json();
      setSearchedUser(profile[0]);
    };
    const getCurrentUser = async () => {
      const response = await fetch("/api/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      setResStatus(response.status);
      const profile = await response.json();
      setCurrentUser(profile[0]);
    };
  
    getSearchedUser().then(() => {
      getCurrentUser();
    });
  }, [user_id, username]);
  

  if(currentUser)
  {

  if(currentUser.username == username)
  {
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
            <MainHeader username={currentUser?.username} />
            <SelfProfile user={currentUser}/>
          </MainProfileContent>
        </MainContainer>
      </>
    );
  }

  else if(currentUser.username != searchedUser.username && isFollowing)
  {
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
            <MainHeader username={currentUser?.username} />
            <OtherProfile user={searchedUser} />
          </MainProfileContent>
        </MainContainer>
      </>
    );
  }

  else 
  {
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
            <MainHeader username={currentUser?.username} />
            <RestrictedProfile currentUser={currentUser} selectedUser={searchedUser} />
          </MainProfileContent>
        </MainContainer>
      </>
    );
  }
  }
  // return (
  //   <>
  //     <Head>
  //       <title>squawk components</title>
  //       <meta name="description" content="squawk components" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <MainContainer>
  //       <MainProfileContent>
  //         <MainHeader username={currentUser?.username} />
          
  //       </MainProfileContent>
  //     </MainContainer>
  //   </>
  // );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // const session = getSession(context.req, context.res);
    const username = context.query.username;
    console.log(username);
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("username", username);

    if (error || data.length == 0) {
      console.log(data);
      return {
        notFound: true,
      };
    }
    console.log(data);
    return {
      props: data[0],
    };
  },
});

export default Profile;
