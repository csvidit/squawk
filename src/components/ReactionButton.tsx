import { motion } from "framer-motion";

const ReactionButton = (props: {shadow: string, children: any}) => {
  return (
    <motion.a
      whileHover={{ rotateX: 25}}
      className={"bg-black w-12 h-12 text-3xl rounded-full flex flex-row justify-center items-center hover:shadow-lg "+props.shadow}
    >
      {props.children}
    </motion.a>
  );
};

export default ReactionButton;
