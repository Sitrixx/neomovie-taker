"use client";

import Image from "next/image";
import Link from "next/link";
import profile from "@/public/user-profile.png";

type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => Promise<void>;

interface NavbarProps {
  searchBar: boolean;
  handleChange?: ChangeHandler;
}

const Navbar: React.FC<NavbarProps> = ({ searchBar, handleChange }) => {
  return (
    <nav className="relative top-0 flex justify-between items-center px-4 py-5 lg:px-5 lg:py-3">
      <h1 className="font-bold text-xl py-2 uppercase text-white">
        <Link href={"/home"}>Neomovie</Link>
      </h1>
      <div className="flex flex-row space-x-6 lg:space-x-12 items-center">
        {searchBar && (
          <input
            className="hidden md:block md:focus:pr-9 pl-5 md:pr-4 py-2 lg:pr-20 lg:py-3 lg:focus:pr-32 transition-all outline-none bg-[#3030307c] rounded-xl lg:rounded-2xl text-white"
            placeholder="Search movie"
            onChange={handleChange}
          />
        )}
        <a
          className="bg-gray-200 w-8 h-8 lg:w-10 lg:h-10 rounded-full cursor-pointer border-[1px] border-[#F692FF]"
          href={"/profile"}
        >
          <Image src={profile} alt="logo-profile" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
