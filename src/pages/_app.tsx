import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { gsap } from "gsap";

export default function App({ Component, pageProps }: AppProps) {
  // return (
  //   <LocomotiveScrollProvider options={{smooth: true,}}>
  //     <Component {...pageProps} />
  //   </LocomotiveScrollProvider>
  // );
  return <Component {...pageProps} />;
  // return (
  //   <LocomotiveScrollProvider options={{smooth: true,}}>
  //     <Component {...pageProps} />
  //   </LocomotiveScrollProvider>
  // );
}
