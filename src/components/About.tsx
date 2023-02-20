import React from "react";
import PostCard from "./PostCard";

const About = () => {
  return (
    <section
      data-scroll
      id="about"
      className={
        "w-screen h-screen flex flex-col lg:flex-row bg-transparent justify-center items-center scroll-smooth"
      }
    >
      <div className="flex flex-col h-screen w-1/3 ml-12 justify-center">
        <PostCard></PostCard>
      </div>
      <div className="flex flex-col h-screen w-2/3 mr-4 justify-center">
        <h2 className="font-medium text-6xl text-lime-500">
          a new, unserious, and relaxed way of socializing online
        </h2>
        <p className="font-light text-2xl text-zinc-300 mt-4">
          no algorithms, no influencers, no bs.
        </p>
        <div className="flex flex-row space-x-5 items-center tranform -skew-x-6">
          <p className="font-light text-8xl text-red-400 mt-12">just vibes.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
