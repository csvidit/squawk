/**
 * Initialization
 * The Search component is defined as the default export of the file and represents the main component for the Search page. It allows users to search for other users and displays the search results.
 *
 * Rendering
 * The component renders a section with the following elements:
 * A Head component from Next.js to set the page title and metadata.
 * The MainContainer component, which provides the main layout container.
 * The MainContent component, which represents the main content section.
 * The MainHeader component, which displays the username of the authenticated user.
 * A container with a background and heading for the search section.
 * A search input field and button for entering the search query and triggering the search.
 * The SearchResultsContainer component, which displays the search results.
 *
 * Functionality
 * The component manages the state of the search query using the query state variable.
 * The handleQueryChange function is triggered when the user enters a value in the search input field and updates the query state accordingly.
 * The clickHandler function is triggered when the user clicks the search button. It sends a request to the server to search for users based on the query and updates the results state with the search results.
 * The results state is used to render the SearchResult components, which display the search results.
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

gsap.registerPlugin(ScrollTrigger);

export default function Search() {
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
        <title>Preferences - Squawk Social</title>
        <meta
          name="description"
          content="Search your friends on Squawk Social."
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
        <meta property="og:url" content="https://squawk.com/search" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="Search your friends on Squawk Social."
        />
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
              {results.map((x) => (
                <SearchResult profile={x} key={x.user_id} />
              ))}
            </SearchResultsContainer>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
