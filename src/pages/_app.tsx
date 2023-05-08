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
  // return (
  //   <SessionContextProvider
  //     supabaseClient={supabase}
  //     initialSession={pageProps.initialSession}
  //   >
  //     <Component {...pageProps} />
  //   </SessionContextProvider>
  // );

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );

  // return (
  //   <LocomotiveScrollProvider options={{smooth: true,}}>
  //     <Component {...pageProps} />
  //   </LocomotiveScrollProvider>
  // );
}
