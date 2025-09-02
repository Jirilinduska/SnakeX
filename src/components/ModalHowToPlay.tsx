"use client"

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaGamepad } from "react-icons/fa";
import { HowToPlay } from "./HowToPlay"
import { useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useSounds } from "@/hooks/useSounds"

export const ModalHowToPlay = ({ open, handleClose } : { open: boolean, handleClose: () => void }) => {

    const { playButton } = useSounds()
    const [stage, setStage] = useState(0)

    const handleClick = (clickStage: number) => {
        setStage(clickStage)
        playButton()
    }

    const incStage = () => {
        if(stage === 4) return
        setStage(prev => prev + 1)
        playButton()
    }

    const decStage = () => {
        if(stage === 0) return
        setStage(prev => prev - 1)
        playButton()
    }


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
                    <FaGamepad className="size-6 text-black" />
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      How to play
                    </DialogTitle>

                    <HowToPlay stage={stage} />

                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 my-4">
                <button className="cursor-pointer" onClick={decStage}>
                    <GrFormPrevious className="text-3xl text-black" />
                </button>
                <div className="flex gap-1">
                    <button onClick={() => handleClick(0)} className={`${stage === 0 ? "bg-black" : "bg-gray-500"} w-[30px] h-[10px] cursor-pointer`}></button>
                    <button onClick={() => handleClick(1)} className={`${stage === 1 ? "bg-black" : "bg-gray-500"} w-[30px] h-[10px] cursor-pointer`}></button>
                    <button onClick={() => handleClick(2)} className={`${stage === 2 ? "bg-black" : "bg-gray-500"} w-[30px] h-[10px] cursor-pointer`}></button>
                    <button onClick={() => handleClick(3)} className={`${stage === 3 ? "bg-black" : "bg-gray-500"} w-[30px] h-[10px] cursor-pointer`}></button>
                    <button onClick={() => handleClick(4)} className={`${stage === 4 ? "bg-black" : "bg-gray-500"} w-[30px] h-[10px] cursor-pointer`}></button>
                </div>
                <button className="cursor-pointer" onClick={incStage}>
                    <GrFormNext className="text-3xl text-black" />
                </button>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex cursor-pointer w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}