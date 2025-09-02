"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { LeaderboardItem } from "./LeaderboardItem"

type LeaderboardData = {
  userID: string;
  username: string;
  score: number;
  difficulty: string;
};

export const ModalLeaderboard = ({ open, handleClose,} : { open: boolean, handleClose: () => void }) => {

  const [data, setData] = useState<LeaderboardData[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leaderboard", { method: "GET" })
      if (res.ok) {
        const json = await res.json()
        setData(json.data)
      }
    }
    fetchData()
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
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[50%] max-w-none sm:my-8"
            >
              <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full h-[600px] overflow-y-auto">
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-center mb-4">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>

                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-white text-center"
                  >
                    Leaderboard
                  </DialogTitle>

                  <div className="p-4 w-full">
                    <div className="grid grid-cols-3 font-bold border-b pb-2 w-full">
                      <p>User</p>
                      <p className="text-center">Difficulty</p>
                      <p className="text-right">Score</p>
                    </div>

                    {data && data.sort((a,b) => b.score - a.score).map(x => (
                      <LeaderboardItem key={x.userID + x.difficulty} {...x} />
                    ))}
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
  );
};
