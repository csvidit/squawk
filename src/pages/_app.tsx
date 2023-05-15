import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { gsap } from "gsap";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // The UserProvider component wraps the App component so that the useUser hook can be used anywhere in the app to
  // obtain basic user profile information

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );

  // This code is commented because it was used to test Locomotive Scroll, a UI library for controlling scrolling.
  // It was not used because the desired outcome was obtained using GSAP

  // return (
  //   <LocomotiveScrollProvider options={{smooth: true,}}>
  //     <Component {...pageProps} />
  //   </LocomotiveScrollProvider>
  // );
}
