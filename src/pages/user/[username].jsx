/**
 * Initialization
 * The Profile component is defined as the main component for this dynamic route. It handles rendering different profile views based on the provided username and the current user's information. The component is exported as the default export of the file.
 * 
 * State and Variables
 * The component defines several state variables and variables:
 * searchedUser: Holds the information of the user being searched for.
 * posts: Stores the posts associated with the user profile.
 * user, isLoading, error: Variables provided by the useUser hook from @auth0/nextjs-auth0 for handling user authentication.
 * user_id: Stores the current user's ID.
 * currentUser: Holds the information of the current user.
 * resStatus: Stores the HTTP response status.
 * router: The Next.js router object for handling routing.
 * username: Extracted from the router's query object, representing the username from the route path.
 * criteria: Represents the search criteria for fetching user profiles.
 * isFollowing: Indicates whether the current user is following the searched user.
 * 
 * useEffect Hooks
 * The component utilizes useEffect hooks to perform side effects. The following are the effects:
 * Fetches the searched user's information and sets the searchedUser state.
 * Fetches the current user's information and sets the currentUser state.
 * 
 * Conditional Rendering
 * The component conditionally renders different profile views based on the current user and the searched user:
 * If the current user's username matches the username from the route, it renders the SelfProfile component.
 * If the current user's username does not match the searched user's username and the current user is following the searched user, it renders the OtherProfile component.
 * If none of the above conditions are met, it renders the RestrictedProfile component.
 * 
 * getServerSideProps
 * The getServerSideProps function is used for server-side rendering and authentication. It retrieves the username from the route query and fetches the user's data from the Supabase database. If the user is not found or an error occurs.
 */

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import MainProfileContent from "@/components/MainProfileContent";
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
        <title>{currentUser.username} - Squawk Social</title>
        <meta
          name="description"
          content="User profile on Squawk Social"
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
        <meta property="og:url" content="https://squawk.com" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="User profile on Squawk Social"
        />
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
