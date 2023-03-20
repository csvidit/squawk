import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

export default function ChangeUsernameDialog(props: {user_id: string, profileChanger: Dispatch<SetStateAction<{}>>}) {
  const [isOpen, setIsOpen] = useState(false)
  const [newUsername, setNewUsername] = useState("");
  const userID = props.user_id

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleChangeUsername = async () => {
    console.log(newUsername)
    const fetchProfileData = async () => {
      const response = await fetch("/api/change_username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userID, newUsername}),
      });
      const profile = await response.json();
      props.profileChanger(profile[0]);
      setNewUsername("")
    }
    fetchProfileData()
  }

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <button
          type="button"
          onClick={openModal}
          className="w-full h-14 rounded-b-2xl bg-lime-500 text-black px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          change username
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Username
                  </Dialog.Title>
                  <div className="mt-2">
                    <input value={newUsername} onChange={e => setNewUsername(e.target.value)}  name="newUsername" className='rounded-md ring-gray-600 p-2 bg-white text-black ring-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400'></input>
                  </div>
                  <div className='mt-4'>
                    <button onClick={handleChangeUsername} type="button" className='rounded-md bg-lime-400 text-black hover:bg-lime-500 px-4 py-2'>submit</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

