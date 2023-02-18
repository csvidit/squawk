import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UrlObject } from "url";


const Button = (props: {href: string | UrlObject, children: any}) =>
{
    return(<Link href={props.href}>
        <motion.div className="rounded-full p-3 bg-violet-500 text-lime-300 w-28 flex flex-row justify-center items-center">
            <p>{props.children}</p>
        </motion.div>
    </Link>);
}

export default Button;