import { motion } from "framer-motion";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";

const LandingNavButton = (props: {href: string, children: any}) =>
{
    return(
        <Link href={props.href} className="flex flex-row justify-center items-center">
        <motion.div whileHover={{color: "#ef4444"}} initial={{fontSize: "1rem"}} transition={{type: "tween", duration: 0.2, ease: "easeInOut"}} className="rounded-full flex flex-row space-x-1 text-zinc-900 items-center pl-1 pr-2 border-none">
          {props.children}
        </motion.div>
      </Link>
    )
};

export default LandingNavButton;