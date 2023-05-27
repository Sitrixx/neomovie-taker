"use client";

import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import MovieCard from "./movies/MovieCard";
import clsx from "clsx";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import AddPlaylistButton from "./buttons/AddPlaylistButton";
import PlaylistsDisplayer from "./PlaylistsDisplayer";

interface ProfilePageProps {
  currentUser: any;
  likedGenre: string;
  likedMovies: any;
  watchedMovies: any;
  playlists: any;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  likedGenre,
  likedMovies,
  watchedMovies,
  playlists,
}) => {
  const [selectedOption, setSelectedOption] = useState("liked");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const optionsMapping: any = {
    liked: likedMovies,
    watched: watchedMovies,
    playlists: playlists,
  };

  const stockMovies = optionsMapping[selectedOption];

  return (
    <div className="my-8 px-6 md:px-14 w-full max-w-screen-2xl mx-auto relative">
      <Navbar searchBar={false} />
      <div className="flex flex-col justify-start items-center md:flex-row w-full py-5 px-4 md:py-8 lg:px-5 lg:py-14 space-y-6 md:space-y-0 md:space-x-10">
        <div className="w-24 h-24 md:w-28 md:h-28 lg:h-32 lg:w-32 xl:h-40 xl:w-40 rounded-full bg-white border-2 border-[#F692FF]" />
        <div className="flex flex-col justify-center items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-bebas text-[#F692FF]">
            {currentUser.name}
          </h1>
          <h1 className="text-xl font-poppins text-white">
            Favorite genre :{" "}
            <span className="text-[#F692FF]">{likedGenre}</span>
          </h1>
        </div>
      </div>
      <div className="w-full px-4 py-6 flex items-center justify-center">
        <div className="w-full relative block lg:hidden">
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="w-full px-6 py-4 rounded-2xl flex border-2 border-[#F692FF] appearance-none text-white bg-[#252636] backdrop-blur outline-none"
          >
            <option value="liked">Liked Films</option>
            <option value="watched">Watched Films</option>
            <option value="playlists">Playlists</option>
          </select>
          <div className="absolute right-5 text-white top-1/2 -translate-y-1/2">
            <IoIosArrowDown className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        <div className="hidden lg:flex w-3/5 lg:w-3/6 xl:w-2/5 rounded-xl border-2 border-[#F692FF] text-white bg-[#252636] backdrop-blur py-4 items-center justify-evenly font-medium xl:text-lg">
          <h1
            className={clsx(
              "cursor-pointer hover:text-[#F692FF]",
              selectedOption === "liked" && "text-[#F692FF]"
            )}
            onClick={() => handleOptionClick("liked")}
          >
            Liked movies
          </h1>
          <h1
            className={clsx(
              "cursor-pointer hover:text-[#F692FF]",
              selectedOption === "watched" && "text-[#F692FF]"
            )}
            onClick={() => handleOptionClick("watched")}
          >
            Watched movies
          </h1>
          <h1
            className={clsx(
              "cursor-pointer hover:text-[#F692FF]",
              selectedOption === "playlists" && "text-[#F692FF]"
            )}
            onClick={() => handleOptionClick("playlists")}
          >
            Playlists
          </h1>
        </div>
      </div>
      <div
        className={clsx(
          "mx-4 my-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-8",
          stockMovies.length === 0 ? "flex items-center justify-center" : "grid"
        )}
      >
        {stockMovies.length !== 0 ? (
          stockMovies.map((item: any, index: any) =>
            stockMovies === playlists ? (
              <PlaylistsDisplayer id={item.id} name={item.name} key={index} />
            ) : (
              <MovieCard id={item.id} poster={item.poster_path} key={index} />
            )
          )
        ) : (
          <span className="text-white py-8 text-lg text-center">
            Nothing to show here. Please add movies.
          </span>
        )}
      </div>
      {selectedOption === "playlists" && <AddPlaylistButton />}
      <div className="my-8 md:my-6 mx-4 p-4"></div>
    </div>
  );
};

export default ProfilePage;
