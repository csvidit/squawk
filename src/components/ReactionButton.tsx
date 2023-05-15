/**
 * The reaction button component reused across all types of post cards. 
 * The styling changes based on the checked state of the individual button.
 * 
 * Commented code is another implementation of changing styles, which did not work due to latency issues.
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ReactionButton = (props: {
  isChecked: boolean;
  checkedChanger: any;
  shadow: string;
  children: any;
  onClick: any;
}) => {
  const [isChecked, setChecked] = useState(props.isChecked);
  const [classes, setClasses] = useState(
    isChecked
      ? "bg-black w-12 h-12 rounded-full flex flex-row justify-center items-center hover:shadow-lg ring outline-dashed outline-offset-2 outline-sky-500 " +
          props.shadow
      : "bg-black w-12 h-12 rounded-full flex flex-row justify-center items-center hover:shadow-lg " +
          props.shadow
  );

  useEffect(() => {
    setClasses(
      isChecked
        ? "bg-black w-12 h-12 rounded-full flex flex-row justify-center items-center hover:shadow-lg ring outline-dashed outline-offset-2 outline-sky-500 " +
            props.shadow
        : "bg-black w-12 h-12 rounded-full flex flex-row justify-center items-center hover:shadow-lg " +
            props.shadow
    );
  }, [isChecked, props.shadow]);

  return (
    <motion.button
      onClick={() => {
        props.onClick();
        setChecked(!isChecked);
        // setClasses(
        //   isChecked
        //     ? "bg-black w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg ring outline-dashed outline-offset-2 outline-sky-500 " +
        //         props.shadow
        //     : "bg-black w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg " +
        //         props.shadow
        // );
      }}
      whileHover={{ rotateX: 25 }}
      className={
        // "bg-black w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg " + props.shadow
        classes
      }
    >
      {props.children}
    </motion.button>
  );
};

export default ReactionButton;
