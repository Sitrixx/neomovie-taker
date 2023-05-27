"use client";

import clsx from "clsx";
import MovieCard from "./movies/MovieCard";

interface DisplayPlaylistsMovies {
  detailsPlaylistsMovies: any;
}

const DisplayPlaylistsMovies: React.FC<DisplayPlaylistsMovies> = ({
  detailsPlaylistsMovies,
}) => {
  const stockMovies = detailsPlaylistsMovies;

  return (
    <>
      <div
        className={clsx(
          "mx-4 my-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-8",
          stockMovies.length === 0 ? "flex items-center justify-center" : "grid"
        )}
      >
        {stockMovies.length !== 0 ? (
          stockMovies.map((item: any, index: any) => (
            <MovieCard id={item.id} poster={item.poster_path} key={index} />
          ))
        ) : (
          <span className="text-white py-8 text-lg text-center">
            Nothing to show here. Please add movies.
          </span>
        )}
      </div>
    </>
  );
};

export default DisplayPlaylistsMovies;
