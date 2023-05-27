"use client";

import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const AddPlaylistButton = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await axios
      .post("/api/add_playlist", {
        name: data.name,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Playlist added.");
          setShowModal((prev) => !prev);
          router.refresh();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <>
      <div
        onClick={() => setShowModal((prev) => !prev)}
        className="fixed right-0 bottom-6 lg:bottom-8 p-6 mr-10 md:mr-[4.5rem] cursor-pointer text-white rounded-xl border-2 border-[#F692FF] bg-[#252636]"
      >
        <FaPlus className="w-6 h-6" />
      </div>

      {showModal && (
        <div className="fixed h-[101vh] w-full bg-[#00000077] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="absolute top-0 right-0 text-white p-10">
            <IoMdClose
              className="w-10 h-10 cursor-pointer"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#090A24] rounded-xl w-2/3 px-6 py-12 space-y-8 flex flex-col items-center max-w-2xl">
            <h1 className="text-white font-semibold w-full text-2xl text-center md:text-4xl">
              Create a new playlist
            </h1>
            <form
              className="space-y-4 max-w-3xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={clsx(
                  "px-4 py-4 rounded-xl border-2 border-transparent focus:border-[#F692FF] bg-[#37385b94] outline-none text-white w-full"
                )}
              />
              <button
                type="submit"
                className="w-full py-4 shadow-[#F048FF] bg-[#F048FF] border-[2px] border-[#58006D] rounded-xl text-white font-semibold text-base"
              >
                Add playlist
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPlaylistButton;
