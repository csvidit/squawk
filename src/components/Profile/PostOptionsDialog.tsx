import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Router, { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";

const PostOptionsDialog = (props: {
  post_id: string;
  postDeleter: Dispatch<SetStateAction<{}>> | any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const post_id = props.post_id;
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDeletePost = async () => {
    console.log(isDeleted);
    const deletePost = async () => {
      const response = await fetch("/api/delete_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id }),
      });
      if (response.ok) {
        const profile = await response.json();
        // props.postDeleter(post_id);
        setDeleted(true);
        router.reload();
      } else {
        alert("Could not delete post");
      }
    };
    deletePost();
  };

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <button
          type="button"
          onClick={openModal}
          className="flex flex-col items-center space-y-1 relative group"
        >
          <div className="flex flex-row space-x-2 items-center z-10">
              <p className="text-violet-500 group-hover:text-neutral-900 transition-all">options</p>
            </div>
            <div className="absolute bottom-0 bg-violet-500 h-[2px] group-hover:rounded-xl group-hover:h-[105%] group-hover:w-[110%] transition-all w-full"></div>
        </button>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black bg-opacity-50 backdrop-blur-md p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-100"
                  >
                    Delete This Post
                  </Dialog.Title>
                  <div className="mt-2 text-neutral-100">
                    <p>this action cannot be undone.</p>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={handleDeletePost}
                      className="flex group flex-row justify-center items-center rounded-full border border-red-500 bg-black bg-opacity-50 text-neutral-100 bg-transparent transition-all hover:bg-red-500 hover:text-neutral-900 hover:border-red-500"
                    >
                      <div className="flex flex-row space-x-1 justify-center items-center pl-4 pr-4 pt-1 pb-1 border-none text-lg font-medium">
                        <p className="text-red-500 group-hover:text-neutral-900 transition-all">
                          <MdDeleteOutline />
                        </p>
                        <p className="hidden lg:flex text-red-500 group-hover:text-neutral-900 transition-all">yes, delete this post</p>
                      </div>
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

export default PostOptionsDialog;
