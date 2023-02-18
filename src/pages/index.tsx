import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import MainContainer from "@/components/MainContainer";
import MainContent from "@/components/MainContent";
import Button from "@/components/Button";
import Features from "@/components/Features";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
          <div className="flex flex-col justify-end items-end space-y-0">
            <h1 className="text-bold text-lime-500 text-8xl">squawk social</h1>
            <h2 className="text-bold text-lime-500 text-4xl">spread your waves</h2>
          </div>
        </MainContent>
        <Features></Features>
      </MainContainer>{" "}
    </>
  );
}

// text-[#F08080]