"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const PlayTrailer = ({ trailer }: { trailer: string }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="w-full space-y-6 items-center justify-center flex flex-col">
        <div className="h-52 w-1 bg-white" />
        <div
          onClick={() => setShowModal((prev) => !prev)}
          className="rounded-full border-2 bg-transparent border-white h-10 w-10 cursor-pointer flex items-center justify-center text-white"
        >
          <FaPlay />
        </div>
        <div className="h-52 w-1 bg-white" />
      </div>
      {showModal && (
        <div className="fixed h-[101vh] w-full bg-[#00000077] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="absolute top-0 right-0 text-white p-10">
            <IoMdClose
              className="w-10 h-10 cursor-pointer"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black w-1/3 h-1/3">
            <iframe
              src={"https://www.youtube.com/embed/" + trailer}
              title="Trailer"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayTrailer;
