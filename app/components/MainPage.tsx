"use client";

import MovieCard from "./movies/MovieCard";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { genres } from "@/constants/genres";
import { years } from "@/constants/years";
import { languages } from "@/constants/languages";
import Navbar from "./navbar/Navbar";
import { IoIosArrowDown } from "react-icons/io";
import { DataFromMovieFetch, Movie, MovieArray } from "@/types/movieType";

interface MainProps {
  baseMovies: MovieArray;
  API_KEY: string;
}

interface Filters {
  year: string;
  language: string;
  genre: string;
}

const MainPage: React.FC<MainProps> = ({ baseMovies, API_KEY }) => {
  const [stockMovies, setStockedMovies] = useState<MovieArray>(baseMovies);
  const [filters, setFilters] = useState<Filters>({
    year: "",
    language: "",
    genre: "",
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${event.target.value}&page=1`
      )
      .then((data: DataFromMovieFetch) => {
        setStockedMovies(event.target.value ? data.data.results : baseMovies);
      });
  };

  const populateFilterArray = async () => {
    const { year, language, genre } = filters;

    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1&primary_release_year=${year}&language=${language}&with_genres=${genre}`
      )
      .then((data: DataFromMovieFetch) => {
        setStockedMovies(
          year || language || genre ? data?.data.results : baseMovies
        );
      });
  };

  useLayoutEffect(() => {
    populateFilterArray();
  }, [filters]);

  return (
    <div className="my-8 px-6 md:px-14 w-full max-w-screen-2xl mx-auto">
      <Navbar searchBar={true} handleChange={handleChange} />
      <div className="block md:hidden py-5 px-4 w-full">
        <input
          className="pl-4 py-3 transition-all outline-none bg-[#3030307c] rounded-xl text-white w-full"
          placeholder="Search movie"
          onChange={handleChange}
        />
      </div>
      <div className="my-2 md:my-4 lg:my-8 xl:my-12 mx-4 text-white flex items-center justify-center">
        <div className="w-full lg:w-5/6 xl:w-4/6 flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-4 xl:space-x-8">
          <div className="w-full relative">
            <select
              className="border-2 border-[#F692FF] px-5 py-3 rounded-2xl bg-[#252636] text-white cursor-pointer backdrop-blur appearance-none w-full outline-none"
              value={filters.year}
              name="year"
              onChange={handleSelectChange}
            >
              <option value="">Select Year</option>
              {years.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <div className="absolute right-4 text-white top-1/2 -translate-y-1/2">
              <IoIosArrowDown className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full relative">
            <select
              className="border-2 border-[#F692FF] px-5 py-3 rounded-2xl bg-[#252636] text-white cursor-pointer backdrop-blur appearance-none w-full outline-none"
              value={filters.genre}
              name="genre"
              onChange={handleSelectChange}
            >
              <option value="">Select Genre</option>
              {genres.map(({ id, name }, index) => (
                <option value={id} key={index}>
                  {name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 text-white top-1/2 -translate-y-1/2">
              <IoIosArrowDown className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full relative">
            <select
              className="border-2 border-[#F692FF] px-5 py-3 rounded-2xl bg-[#252636] text-white cursor-pointer backdrop-blur appearance-none w-full outline-none"
              value={filters.language}
              name="language"
              onChange={handleSelectChange}
            >
              <option value="select">Select Language</option>
              {languages.map(({ id, name }, index) => (
                <option value={id} key={index}>
                  {name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 text-white top-1/2 -translate-y-1/2">
              <IoIosArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-8">
        {stockMovies &&
          stockMovies.map((item: Movie, index: number) => (
            <MovieCard id={item.id} poster={item.poster_path} key={index} />
          ))}
      </div>
      <div className="my-8 md:my-6 mx-4 p-4"></div>
    </div>
  );
};

export default MainPage;
