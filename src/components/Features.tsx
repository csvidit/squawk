import React from "react";
import styles from "./Features.module.scss";

const Features = () => {
  return (
    <section
      data-scroll
      id="features"
      className={
        "w-screen h-screen flex flex-col justify-center items-center scroll-smooth " +
        styles.landing_features
      }
    >
      <div className="flex flex-col m-10">
        <div className="flex flex-col transform -translate-x-10 -translate-y-16 rotate-6 self-center">
          <h2 className="font-medium text-6xl text-lime-500">
            sick new reactions
          </h2>
          <div className="flex flex-row items-center space-x-4 font-light text-4xl text-zinc-300 mt-4">
            <p>choose from</p>
            <p>💯</p>
            <p>🐍</p>
            <p>💅🏽</p>
            <p>💀</p>
          </div>
        </div>
        <div className="flex flex-col transform translate-x-28 -rotate-6 self-center mt-10">
          <h2 className="font-medium text-6xl text-lime-500">equitable</h2>
          <p className="font-light text-4xl text-zinc-300 mt-4">
            newest posts show first. simple.
          </p>
        </div>
        <div className="flex flex-col transform -translate-x-28 rotate-6 self-center mt-10">
          <h2 className="font-medium text-6xl text-lime-500 mt-10">
            drama-free
          </h2>
          <div className="font-light text-4xl text-zinc-300 mt-4 flex flex-col justify-end items-end">
            <p className="flex">never worry about your ratio again,</p>
            <p className="flex">cuz it ain&apos;t public</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
