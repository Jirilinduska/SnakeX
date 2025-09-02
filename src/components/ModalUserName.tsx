'use client'

import { useGameContext } from '@/context/GameContext'
import { useSounds } from '@/hooks/useSounds'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'


export const ModalUserName = () => {

    const { handleStartMusic } = useGameContext()
    const { playButton, playErrorMsg } = useSounds()
    const [open, setOpen] = useState<boolean>(false)
    const [isUserName, setIsUserName] = useState<boolean>(false)
    const [userName, setUserName] = useState("")
    const [errMsg, setErrMsg] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        localStorage.setItem("username", e.target.value)
        setErrMsg(false)
    }

    const handleClose = () => {
        if(userName === "") {
            setErrMsg(true)
            playErrorMsg()
        } else {
            setOpen(false)
        }
    }

    const handleBtnClick = () => {
        playButton()
        handleStartMusic()
        handleClose()
    }

    useEffect(() => {
        setOpen(true)
        if(!localStorage.getItem("username")) {
            setIsUserName(false)
        } else {
            setUserName(localStorage.getItem("username") || "")
            setIsUserName(true)
        }
    }, [] )


  return (
    <div>

      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-pixely">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <UserIcon
                      aria-hidden="true"
                      className="size-6 text-black"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {isUserName 
                        ? `Welcome back ${userName}!` 
                        : "Welcome!"
                      }
                    </DialogTitle>

                    {errMsg && <p className="text-red-500">Please enter username!</p>}

                    {!isUserName &&  
                        <div>
                            <input
                                className="border border-gray-500 text-black"
                                value={userName}
                                placeholder='Enter username'
                                onChange={handleChange}
                            />
                        </div>
                    }

                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleBtnClick}
                  className="inline-flex cursor-pointer w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  {isUserName ? "Play" : "Save"}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
