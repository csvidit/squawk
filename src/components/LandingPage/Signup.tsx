import styles from "./Signup.module.scss";
import { SetStateAction, useState } from "react";
import SignupTabs from "../SignupTabs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import Button from "../Button";
import { HiOutlineLogin } from "react-icons/hi";
import Link from "next/link";
// import { supabase } from "@/supabase/supabase.config";

/**

    Signup Component
    This component represents the signup section of the application.
    It allows users to sign up and start using the application.
    */

const Signup = () => {
  const session = useSession();

  return (
    <section
      data-scroll
      id="signup"
      className={
        "w-screen h-screen flex flex-col bg-transparent justify-start lg:justify-center items-center scroll-smooth"
      }
    >
      <div className="ml-8 lg:ml-12 lg:w-1/2 flex flex-col space-y-4 justify-start items-center italic select-none">
        <Link
          href="/api/auth/login"
          className="flex flex-col items-center space-y-1 relative group"
        >
          <div className="flex flex-row space-x-2 items-center z-10">
            <h2 className="text-8xl text-red-400 group-hover:text-violet-700 transition-all">sign up</h2>
          </div>
          <div className="absolute -bottom-5 bg-red-400 h-[2px] group-hover:rounded-xl group-hover:bg-lime-500  group-hover:h-[110%] group-hover:w-[110%] transition-all w-full"></div>
        </Link>

        <h2 className="text-6xl text-lime-500">and start squawking!</h2>
        <div></div>
      </div>
      <div className="w-1/2 flex flex-col space-y-4 justify-start items-center transform">
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google']}/> */}
      </div>
    </section>
  );
};

export default Signup;
