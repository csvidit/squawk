import React from "react";
import { motion } from "framer-motion";
import HeaderButton from "./HeaderButton";

const LandingHeader = () =>
{
    return(
        <motion.div className="flex flex-row items-center justify-between">
            <motion.div id="branding" className="flex flex-row items-center justify-start text-bold italic text-amber-500">
                <p className="">squawk social</p>
            </motion.div>
            <motion.div id="nav" className="flex flex-row items-center justify-left">
                <HeaderButton href="#">About</HeaderButton>
                <HeaderButton href="#">About</HeaderButton>
            </motion.div>
        </motion.div>
    )
}