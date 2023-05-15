import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useState, Suspense, SetStateAction } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import MainHeader from "@/components/MainHeader";
import MainContent from "@/components/MainContent";
import { BsDot } from "react-icons/bs";
import RegularHero from "@/components/RegularHero";
import { Profile } from "@/interfaces/Profile";
import Image from "next/image";
import ButtonSubmitPost from "@/components/ButtonSubmitPost";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState();
  const { user, isLoading } = useUser();
  const user_id = user?.sub;
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const [caption, setCaption] = useState("");

  function handleCaptionChange(event) {
    setCaption(event.target.value);
  }

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

  const handleSubmit = () => {
    const sendPostData = async () => {
      console.log("SendPostData called");
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("image", imageFile, "newPostImage");
      formData.append("caption", caption);
      console.log(formData);
      //   const response = await fetch("/api/add_post", {
      //     method: "POST",

      //     body: formData
      //   });
      const response = await axios.post("/api/add_post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        alert("Post added");
        router.push("/user/" + userProfile?.username);
        const responseData = await response.data;
        console.log(responseData);
      } else {
        alert("Failed to add post");
        const responseData = await response.data;
        console.log(responseData);
      }
    };
    sendPostData();
  };
  return (
    <>
      <Head>
        <title>New Post - Squawk Social</title>
        <meta
          name="description"
          content="Create and share a new post on Squawk Social."
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
        <meta property="og:url" content="https://squawk.com/new-post" />
        <meta property="og:site_name" content="Squawk Social LLC" />
        <meta
          property="description"
          content="Create and share a new post on Squawk Social."
        />
      </Head>
      <MainContainer>
        <MainContent>
          <MainHeader username={userProfile?.username} />
          <RegularHero>
            <div className="w-100 flex flex-col flex-grow space-y-2 justify-center items-center">
              <h1 className="text-4xl lg:text-6xl font-medium">
                ✨ new post ✨
              </h1>
            </div>
            <div className="hidden flex-col justify-center items-center w-80 h-40">
              <Toast
                duration={75}
                className="flex flex-row p-2 lg:p-4 justify-between items-center bg-lime-900 text-lime-400 bg-opacity-50 drop-shadow-md"
              >
                <p className="">Post Submitted Successfully!</p>
                <Toast.Toggle className="flex flex-row justify-center items-center bg-lime-900  hover:bg-neutral-900" />
              </Toast>
            </div>
          </RegularHero>
          <div className="w-screen flex-grow h-full flex flex-col px-10 mt-10 mb-10 space-y-10 items-center">
            <div className="flex flex-col lg:flex-row flex-grow space-y-4 lg:space-y-0 lg:space-x-4 items-start">
              <div className="flex flex-col justify-between items-center p-2 lg:p-4 w-96 h-max min-h-[384px] bg-neutral-900 bg-opacity-50 rounded-md">
                {!image && (
                  <div className="flex flex-col space-y-2 justify-center items-center">
                    <p>No photo selected</p>
                    <label className="rounded-full pt-2 pb-2 pl-4 pr-4 ring-gray-600 p-2 bg-lime-500 text-black">
                      <p>Upload Photo</p>
                      <input
                        onChange={(event) => {
                          setImage(URL.createObjectURL(event.target.files[0]));
                          setImageFile(
                            (event.target).files?.[0]
                          );
                        }}
                        name="newPostPhoto"
                        type="file"
                        className="hidden"
                        accept="image/png, image/heic, image/jpeg"
                      />
                    </label>
                  </div>
                )}
                {image && (
                  <Image
                    className=""
                    src={image}
                    width={384}
                    height={384}
                    alt="New post content"
                  ></Image>
                )}
                {image && (
                  <label className="mt-2 lg:mt-4 rounded-full pt-2 pb-2 pl-4 pr-4 p-2 bg-transparent text-neutral-100 border border-neutral-100 transition-all hover:text-red-400 hover:border-red-400">
                    <p>Change Photo</p>
                    <input
                      onChange={(event) => {
                        setImage(URL.createObjectURL(event.target.files[0]));
                        setImageFile(
                          (event.target).files?.[0]
                        );
                      }}
                      name="newPostPhoto"
                      type="file"
                      className="hidden"
                      accept="image/png, image/heic, image/jpeg"
                    />
                  </label>
                )}
              </div>
              {image && (
                <div className="flex flex-col justify-between p-2 lg:p-4 w-96 h-96 bg-neutral-900 bg-opacity-50 rounded-md">
                  <textarea
                    placeholder="write a slay caption... or not"
                    name="newPostCaption"
                    onChange={handleCaptionChange}
                    value={caption}
                    className="rounded-md ring-gray-600 flex-grow bg-transparent text-lime-500 focus:outline-none text-lg lg:text-2xl overflow-auto resize-none border-0 focus-visible:ring-0 focus-visible:outline-none"
                  ></textarea>
                  <div className="flex flex-row space-x-2 items-center justify-end text-lg lg:text-2xl">
                    <p
                      className={
                        caption.length <= 200
                          ? "text-neutral-100"
                          : "text-red-400"
                      }
                    >
                      {caption.length}
                    </p>
                    <p className="text-neutral-400">/ 200</p>
                  </div>
                </div>
              )}
              {image && (
                <div className="flex flex-col justify-start lg:justify-center items-center p-2 lg:p-4 w-96 h-96 bg-opacity-50 rounded-md">
                  <ButtonSubmitPost handleSubmit={handleSubmit} />
                </div>
              )}
            </div>
          </div>
        </MainContent>
      </MainContainer>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({});
