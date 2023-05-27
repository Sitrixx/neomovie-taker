"use client";

import { Playlist, Playlists } from "@/types/playlistType";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaHeart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuPlus } from "react-icons/lu";

const addToProfile = async (
  url: string,
  movieId: string,
  isWatched?: boolean | never[],
  isLiked?: boolean | never[]
) => {
  if (isLiked || isWatched) {
    await axios.delete(`/api/${url}/${movieId}`);
  } else {
    await axios.post(`/api/${url}/${movieId}`);
  }
};

const addToPlaylist = async (movieId: string, playlistId: string) => {
  await axios
    .post(`/api/add_to_playlist`, {
      movieId: movieId,
      playlistId: playlistId,
    })
    .then((res) => {
      if (res.status === 200) {
        toast.success("Movie successfully added to playlist");
      }
    })
    .catch(() => {
      toast.error("Movie not added to playlist. Try again later.");
    });
};

interface AddingToPlaylistProps {
  movieId: string;
  playlists: Playlists;
}

interface AddingButtonEyeProps {
  movieId: string;
  isWatched: boolean | never[];
}

interface AddingButtonLikeProps {
  movieId: string;
  isLiked: boolean | never[];
}

export const EyeButton: React.FC<AddingButtonEyeProps> = ({
  movieId,
  isWatched: initialIsWatched,
}) => {
  const [isWatched, setIsWatched] = useState(initialIsWatched);

  const handleClick = () => {
    setIsWatched((prev) => !prev);

    addToProfile("watched_movies", movieId, isWatched);
  };

  return (
    <div
      className={clsx(
        "rounded-full w-12 h-12 flex items-center justify-center cursor-pointer",
        isWatched ? "bg-[#f692ff]" : "bg-[#0000008e]"
      )}
      onClick={handleClick}
    >
      <FaEye className="text-white w-6 h-6" />
    </div>
  );
};

export const LikeButton: React.FC<AddingButtonLikeProps> = ({
  movieId,
  isLiked: initialIsLiked,
}) => {
  const [isLiked, setIsWatched] = useState(initialIsLiked);

  const handleClick = () => {
    setIsWatched((prev) => !prev);

    addToProfile("liked_movies", movieId, isLiked);
  };

  return (
    <div
      className={clsx(
        "rounded-full w-12 h-12 flex items-center justify-center cursor-pointer",
        isLiked ? "bg-[#f692ff]" : "bg-[#0000008e]"
      )}
      onClick={handleClick}
    >
      <FaHeart className="text-white w-6 h-6" />
    </div>
  );
};

export const PlusButton: React.FC<AddingToPlaylistProps> = ({
  movieId,
  playlists,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const handleCheckboxChange = (playlistId: string) => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter((id) => id !== playlistId));
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    }
  };

  const handleAddToPlaylist = async (movieId: string) => {
    await Promise.all(
      selectedPlaylists.map((playlistId: string) => {
        addToPlaylist(movieId, playlistId);
      })
    );
  };

  return (
    <>
      <div
        className="rounded-full w-12 h-12 bg-[#0000008e] flex items-center justify-center cursor-pointer relative"
        onClick={() => setShowModal((prev) => !prev)}
      >
        <LuPlus className="text-white w-6 h-6" />
      </div>
      {showModal && (
        <div
          className="fixed h-[101vh] w-full bg-[#00000077] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ marginLeft: 0 }}
        >
          <div className="absolute top-0 right-0 text-white p-10">
            <IoMdClose
              className="w-10 h-10 cursor-pointer"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
          <div className="absolute flex flex-col text-white px-4 py-8 items-center justify-between top-1/2 left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 z-20 bg-[#252636] w-4/5 h-1/2 md:w-2/4 md:h-7/12 lg:w-2/5 lg:h-3/6 xl:w-3/12 xl:h-3/5">
            <h1 className="text-xl">Choose a playlist</h1>
            <div className="h-3/4 overflow-y-scroll w-full space-y-3 my-6 p-4 overflow-x-hidden no-scrollbar">
              {playlists.map((item: Playlist, index: number) => (
                <div
                  key={index}
                  className="px-4 py-3 flex flex-row justify-between items-center w-full bg-transparent rounded-xl border-2 border-[#F692FF]"
                >
                  <span>{item.name}</span>
                  <input
                    className="hover:cursor-pointer"
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={selectedPlaylists.includes(item.id)}
                  />
                </div>
              ))}
            </div>
            <div className="w-full p-4">
              <button
                className="bg-[#F048FF] px-4 w-full py-3 rounded-xl outline-none"
                onClick={() => handleAddToPlaylist(movieId)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
