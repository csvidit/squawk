import styles from "./Signup.module.scss"

const Signup = () => {
  return (
    <section
      data-scroll
      id="signup"
      className={
        "w-screen h-screen flex flex-col lg:flex-row bg-transparent justify-center items-center scroll-smooth "
      }
    >
      <div className="lg:ml-12 w-1/2 flex flex-col space-y-4 justify-start items-start italic select-none">
        <h2 className="text-8xl text-red-400">sign up</h2>
        <h2 className="text-6xl text-lime-500">and start squawking!</h2>
      </div>
      <div className="w-1/2 flex flex-col space-y-4 justify-start items-start transform -skew-x-6">
      </div>
    </section>
  );
};

export default Signup;
