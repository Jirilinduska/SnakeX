'use client'

import { useGameContext } from '@/context/GameContext'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'

type Props = {
    open: boolean
    handleClose: () => void
}


export const ModalSettings = ({ handleClose, open } : Props) => {

    const { music, sounds, toggleMusic, toggleSounds } = useGameContext()

    const btnClickSound = useRef<HTMLAudioElement | null>(null)

    const handlePlayBtnClickSound = () => {
        if (btnClickSound.current) {
          btnClickSound.current.currentTime = 0
          btnClickSound.current.volume = 0.1
          btnClickSound.current.play()
        }
      }

  return (
    <div>

      <audio ref={btnClickSound} src="/sounds/btn_click_sound.mp3" />

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
                    <WrenchScrewdriverIcon aria-hidden="true" className="size-6 text-black" />
                    
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Settings
                    </DialogTitle>

                    <div className="my-2 flex gap-4 items-center text-black">
                      <p className="text-sm w-14">Music</p>
                      <button 
                        onClick={() => {
                            handlePlayBtnClickSound()
                            toggleMusic()
                        }} 
                        className="border border-black cursor-pointer w-14"
                      >
                            {music ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="mb-2 flex gap-4 items-center text-black">
                      <p className="text-sm w-14">Sounds</p>
                      <button 
                        onClick={() => {
                            handlePlayBtnClickSound()
                            toggleSounds()
                        }} 
                        className="border border-black cursor-pointer w-14"
                      >
                        {sounds ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="mb-2 flex gap-4 items-center text-black">
                      <p className="text-sm w-14">Volume</p>
                      <button className="border border-black cursor-pointer w-14">OFF</button>
                    </div>

                    <div className="mb-2 flex gap-4 items-center text-black">
                      <p className="text-sm w-14">Username</p>
                      <button className="border border-black cursor-pointer w-14">Kokotus</button>
                    </div>


                  </div>
                </div>
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
