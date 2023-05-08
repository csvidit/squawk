import { motion } from "framer-motion";
import Link from "next/link";
import { SlUserFollow } from "react-icons/sl";
import { UrlObject } from "url";

const FollowRequestsButton = () => {
    return (
      <Link
        href="/follow-requests"
        className="flex group flex-row justify-center items-center rounded-xl border border-lime-500 bg-black bg-opacity-50 text-neutral-100 bg-transparent transition-all hover:bg-lime-500 hover:text-neutral-900 hover:border-lime-500"
      >
        <motion.div className="flex flex-row space-x-1 justify-center items-center pl-4 pr-4 pt-1 pb-1 border-none text-lg font-medium">
          <p className="text-sky-500 group-hover:text-sky-700 transition-all"><SlUserFollow /></p>
          <p className="hidden lg:flex">Follow Requests</p>
        </motion.div>
      </Link>
    );
  };
  
  export default FollowRequestsButton;