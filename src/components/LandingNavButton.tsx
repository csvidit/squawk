import { motion } from "framer-motion";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";

const baseVariants = {
  hover: {
    color: "#ef4444",
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const LandingNavButton = (props: { href: string; children: any }) => {
  return (
    <Link
      href={props.href}
      className="flex flex-row justify-center items-center"
    >
      <motion.div
        variants={baseVariants}
        whileHover="hover"
        className="rounded-full flex flex-row space-x-1 text-neutral-900 items-center border-none"
      >
        {props.children}
      </motion.div>
    </Link>
  );
};

export default LandingNavButton;
