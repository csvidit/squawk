import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi2";

//tried the group-hover attribute here
const NewPostHeaderButton = () => {
  return (
    <Link
      href="/new-post"
      className="flex group flex-row justify-center items-center rounded-xl bg-violet-700 text-violet-100 bg-transparent transition-all hover:bg-violet-900 hover:text-lime-400"
    >
      <motion.div className="flex flex-row space-x-1 justify-center items-center p-1 lg:p-0 lg:pl-4 lg:pr-4 border-none">
        <p className="group-hover:text-sky-500 transition-all"><HiOutlinePencil /></p>
        <p className="hidden lg:flex">New Post</p>
      </motion.div>
    </Link>
  );
};

export default NewPostHeaderButton;
