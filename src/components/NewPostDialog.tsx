import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { BsPencilFill } from "react-icons/bs";

const mainDivVariants = {
  hover: {
    boxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    webkitBoxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    mozBoxShadow: "0px 0px 264px 45px rgba(132, 204, 22, 0.6)",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
  initial: {
    boxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    webkitBoxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    mozBoxShadow: "0px 0px 0px 0px rgba(78, 70, 229, 0.6)",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
};
const iconVariants = {
  initial: {
    color: "#171717",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
  hover: {
    color: "#0284c7",
    transition: {
      duration: 0.1,
      type: "spring",
      ease: "easeInOut",
    },
  },
};

const NewPostDialog = (props: {
  user_id: string;
  profileChanger: Dispatch<SetStateAction<{}>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const userID = props.user_id;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChangeUsername = async () => {
    // console.log(newUsername);
    // const fetchProfileData = async () => {
    //   const response = await fetch("/api/change_username", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ userID, set }),
    //   });
    //   if (response.ok) {
    //     const profile = await response.json();
    //     props.profileChanger(profile[0]);
    //     setImage("");
    //   } else {
    //     alert("Username already exists");
    //   }
    // };
    // fetchProfileData();
  };

  return (
    <>
      <div className="z-10 fixed bottom-12 w-10/12 flex flex-row self-center justify-end items-center">
        <motion.button
          onClick={openModal}
          variants={mainDivVariants}
          initial="initial"
          whileHover="hover"
          type="button"
          className={
            "flex flex-row space-x-2 justify-center items-center bg-lime-500 drop-shadow-md rounded-full pt-4 pb-4 pl-6 pr-6 text-lg lg:text-2xl"
          }
        >
          {/* <motion.p variants={primaryPVariants} className="">
          <BsPencilFill />
        </motion.p> */}
          {/* <motion.p>
            <Image src="/eye.svg" width={25} height={25} alt="Smiling cartoon face"/>
        </motion.p> */}
          <motion.p variants={iconVariants} className="text-neutral-900">
            <BsPencilFill />
          </motion.p>
          <p className="text-neutral-900">New Post</p>
        </motion.button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black bg-opacity-30 backdrop-blur-md p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Create New Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <label>
                      Your Image File
                      <input
                        name="newPostPhoto"
                        type="file"
                        className="rounded-md ring-gray-600 p-2 bg-white text-black ring-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        accept="image/png, image/heic, image/jpeg"
                      />
                    </label>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      name="newUsername"
                      className="rounded-md ring-gray-600 p-2 bg-white text-black ring-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    ></input>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleChangeUsername}
                      type="button"
                      className="rounded-md bg-lime-400 text-black hover:bg-lime-500 px-4 py-2"
                    >
                      submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewPostDialog;
