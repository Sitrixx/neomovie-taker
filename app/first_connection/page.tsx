"use client";

import clsx from "clsx";
import Link from "next/link";
import { genres } from "@/constants/genres";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const FirstConnection = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const router = useRouter();
  const session = useSession();

  const handleSelectedGenre = (name: string) => {
    setSelectedGenre(name);
  };

  const submitGenre = async (genre: string) => {
    await axios
      .post("/api/first_connection", {
        email: session.data?.user?.email,
        genre: genre,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("liked_genre", genre);
          toast.success("Registered");
        }
      })
      .catch((error: Error) => {
        toast.error("Can't register.");
        console.log(error);
      })
      .finally(() => {
        router.push("/home");
      });
  };

  return (
    <div className="min-h-full bg-center bg-cover bg-no-repeat flex flex-row justify-center bg-register">
      <div className="my-8 px-6 md:px-14 w-full max-w-screen-2xl mx-auto">
        <div className="relative top-0 flex justify-between py-5 px-4 lg:px-5 lg:py-3">
          <h1 className="font-bold text-xl py-2 uppercase text-white">
            <Link href={"/"}>Neomovie</Link>
          </h1>
        </div>
        <div className="max-w-fit mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-fit lg:mx-0 lg:px-5">
          <h1 className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-white">
            <span className="text-rose font-semibold">First</span> time here ?
          </h1>
        </div>
        <div
          className={clsx(
            "max-w-fit mx-auto text-sm mt-2 lg:text-xl md:text-lg text-[#D7D7D7] flex items-center justify-center lg:my-4 font-medium px-4 sm:max-w-md md:max-w-lg lg:max-w-fit lg:mx-0 lg:px-5 mb-6 lg:mb-8 text-center"
          )}
        >
          <h1>
            Before you continue to the home page, we just need you to select
            your favorite genre :
          </h1>
        </div>
        <div className="px-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-4">
          {genres.map(({ id, name }, index) => (
            <div
              onClick={() => handleSelectedGenre(id)}
              key={index}
              className={clsx(
                "p-4 cursor-pointer text-center lg:text-lg text-xs rounded-2xl border-[1px] border-[#F692FF] bg-[#37385b94] outline-none text-white flex items-center justify-center",
                selectedGenre === id && "bg-[#F048FF]"
              )}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="max-w-full flex items-center justify-center m-8 lg:m-12">
          <button
            disabled={selectedGenre === ""}
            onClick={() => submitGenre(selectedGenre)}
            className="py-3 disabled:opacity-50 disabled:bg-[#f79aff] disabled:cursor-not-allowed px-10 md:px-12 lg:px-20 my-2 lg:text-xl md:text-lg shadow-[#F048FF] bg-[#F048FF] border-[2px] border-[#58006D] rounded-2xl text-white font-semibold text-base"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstConnection;
