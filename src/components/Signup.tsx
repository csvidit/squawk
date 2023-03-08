import styles from "./Signup.module.scss";
import { SetStateAction, useState } from "react";
import SignupTabs from "./SignupTabs";

const Signup = () => {
  return (
    <section
      data-scroll
      id="signup"
      className={
        "w-screen h-screen flex flex-col lg:flex-row bg-transparent justify-start lg:justify-center items-center scroll-smooth"
      }
    >
      <div className="ml-8 lg:ml-12 lg:w-1/2 flex flex-col space-y-4 justify-start items-start italic select-none">
        <h2 className="text-8xl text-red-400">sign up</h2>
        <h2 className="text-6xl text-lime-500">and start squawking!</h2>
        <div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col space-y-4 justify-start items-start transform">
      </div>
    </section>
  );
};

export default Signup;
