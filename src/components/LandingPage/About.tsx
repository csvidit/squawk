import React from "react";
import DemoPostCard from "../DemoPostCard";

const About = () => {
  return (
    <section
      data-scroll
      id="about"
      className={
        "w-screen h-screen flex flex-col lg:flex-row bg-transparent justify-center items-center scroll-smooth"
      }
    >
      <div className="flex flex-col lg:h-screen lg:w-1/3 lg:ml-12 justify-center">
        <DemoPostCard/>
      </div>
      <div className="flex flex-col lg:h-screen w-2/3 justify-center">
        <h2 className="font-medium text-4xl mt-10 lg:mt-0 lg:text-6xl text-lime-500">
          a new, unserious, and relaxed way of socializing online
        </h2>
        <p className="font-light text-2xl text-zinc-300 mt-4">
          no algorithms, no influencers, no bs.
        </p>
        <div className="flex flex-row space-x-5 items-center italic">
          <p className="font-light text-6xl lg:text-8xl text-red-400 mt-12">just vibes.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
