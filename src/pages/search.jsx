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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [results, setResults] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [query, setQuery] = useState("");
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
    getCurrentUser();
  }, [user_id]);

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  const clickHandler = () => {
    const searchUsers = async () => {
      const response = await fetch("/api/search_users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const searchResults = await response.json();
      setResults(searchResults);
      console.log(searchResults);
    };
    searchUsers();
  };

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
          <div className="w-screen flex flex-row items-center justify-center bg-black bg-opacity-50 drop-shadow-md shadow-white">
            <div className="p-3 lg:p-5 w-10/12 mt-40 text-lime-500 flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:items-center">
              <div className="flex flex-row space-x-2">
                <h1 className="text-4xl lg:text-6xl font-medium ">search</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-10 items-center mt-10 w-screen">
            <div className="flex flex-row space-x-3 justify-between lg:space-x-5 items-center h-14 pl-3 lg:pl-5 w-10/12 rounded-full bg-black bg-opacity-50 text-lg">
              <div className="flex flex-row flex-grow items-center space-x-3 h-full lg:space-x-5 text-lime-500">
                <p>Who are you looking for?</p>
                <input
                  name="searchUsersQuery"
                  value={query}
                  onChange={handleQueryChange}
                  className="bg-transparent text-2xl h-full flex flex-grow text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
                  placeholder="Type here :)"
                ></input>
              </div>

              <button
                onClick={(e) => clickHandler(e.target.value)}
                type="button"
                className="flex justify-center items-center transition-all hover:bg-lime-500 hover:text-black w-16 rounded-r-full h-full text-2xl"
              >
                <HiOutlineMagnifyingGlass />
              </button>
            </div>
            <SearchResultsContainer>
              {results.map((x) => <SearchResult profile={x} key={x.user_id}/>)}
            </SearchResultsContainer>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();

// text-[#F08080]
