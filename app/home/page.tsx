import { getMoviesByGenre } from "@/app/actions/getMovies";
import MainPage from "../components/MainPage";

export default async function Home() {
  const baseMovies = await getMoviesByGenre();

  if (!process.env.API_KEY_TMDB) throw "Error";

  return (
    <>
      <div className="min-h-full md:max-h-full md:overflow-x-hidden flex flex-row justify-center bg-[#090A24]">
        <MainPage
          baseMovies={baseMovies.results}
          API_KEY={process.env.API_KEY_TMDB}
        />
      </div>
    </>
  );
}
