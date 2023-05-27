import PlayTrailer from "@/app/components/PlayTrailer";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideo,
} from "@/app/actions/getMovies";
import Navbar from "@/app/components/navbar/Navbar";
import {
  EyeButton,
  LikeButton,
  PlusButton,
} from "@/app/components/buttons/AddingButtons";
import {
  getLikedMovieById,
  getWatchedMovieById,
} from "@/app/actions/getMovieStatus";
import { getPlaylists } from "@/app/actions/getProfileInfos";
import { Cast, Language, Video } from "@/types/movieType";

export default async function Home({ params }: { params: { id: string } }) {
  const details = await getMovieDetails(params.id);
  const video = await getMovieVideo(params.id);
  const credits = await getMovieCredits(params.id);
  const isLiked = await getLikedMovieById(params.id);
  const isWatched = await getWatchedMovieById(params.id);
  const playlists = await getPlaylists();

  let targetLanguage = null;
  const targetIso = details.original_language;

  details.spoken_languages.map((language: Language) => {
    if (language.iso_639_1 === targetIso) {
      targetLanguage = language.english_name;
    }
  });

  const backdrop =
    "https://image.tmdb.org/t/p/original" + details.backdrop_path;
  const trailerObject = video.results.find(
    (item: Video) => item.type === "Trailer"
  );

  const trailer = trailerObject ? trailerObject.key : null;

  return (
    <div
      className="min-h-full md:max-h-full md:overflow-x-hidden flex flex-row justify-center bg-center bg-cover font-poppins"
      style={{
        backgroundImage: `linear-gradient(rgba(9, 10, 36, 0.37), rgba(9, 10, 36, 0.37)), url(${backdrop})`,
      }}
    >
      <div className="my-8 px-6 md:px-14 w-full min-h-full max-w-screen-2xl mx-auto">
        <Navbar searchBar={false} />
        <div className="w-full flex flex-col py-5 px-4 lg:px-5 lg:py-3 space-y-8 xl:flex-row xl:justify-between xl:h-[80vh]">
          <div className="hidden xl:flex xl:w-[12%] h-full items-center justify-center space-x-2">
            <div className="w-1/3 flex flex-col items-center justify-center h-full">
              <PlayTrailer trailer={trailer} />
            </div>
            <div className="w-2/3">
              <h1 className="text-white">Play trailer</h1>
            </div>
          </div>
          <div className="flex flex-col xl:w-3/6 xl:justify-between xl:h-[65vh] xl:space-y-16">
            <div className="flex flex-col w-full xl:min-h-fit">
              <h1 className="font-bebas text-white text-7xl md:text-8xl lg:text-9xl">
                {details.title}
              </h1>
              <h1 className="text-white text-sm font-light md:text-base lg:text-lg">
                {details.overview}
              </h1>
            </div>
            <div className="hidden xl:flex w-full pb-8 xl:min-h-fit">
              <h1 className="font-semibold text-white text-lg w-2/12">
                CAST :
              </h1>
              <div className="grid grid-cols-cast gap-3 w-10/12">
                {credits.cast.slice(0, 9).map((item: Cast) => {
                  return <h1 className="font-light text-white">{item.name}</h1>;
                })}
              </div>
            </div>
          </div>
          <iframe
            src={"https://www.youtube.com/embed/" + trailer}
            title="Trailer"
            className="w-full h-[48vw] block xl:hidden"
          ></iframe>
          <div className="flex flex-row items-center justify-center space-x-8 xl:w-1/6 xl:items-start xl:pt-8">
            <EyeButton movieId={details.id.toString()} isWatched={isWatched} />
            <LikeButton movieId={details.id.toString()} isLiked={isLiked} />
            <PlusButton movieId={details.id.toString()} playlists={playlists} />
          </div>
          <div className="grid grid-cols-2 gap-y-4 [&>*:nth-child(even)]:justify-self-end xl:flex xl:flex-col xl:w-1/6 xl:space-y-9 xl:h-full xl:pt-8">
            <div className="rounded-xl w-11/12 p-4 flex flex-col items-center justify-center font-bebas text-white bg-[#ffffff13] backdrop-blur xl:w-full">
              <h1 className="xxs:text-lg text-xl lg:text-2xl text-[#ffffff4f]">
                Genre
              </h1>
              <h1 className="xxs:text-xl text-2xl lg:text-3xl">
                {details.genres[0].name}
              </h1>
            </div>
            <div className="rounded-xl w-11/12 p-4 flex flex-col items-center justify-center font-bebas text-white bg-[#ffffff13] backdrop-blur xl:w-full">
              <h1 className="xxs:text-lg text-xl lg:text-2xl text-[#ffffff4f]">
                RATING
              </h1>
              <h1 className="xxs:text-xl text-2xl lg:text-3xl">
                {details.vote_average.toFixed(1)} / 10
              </h1>
            </div>
            <div className="rounded-xl w-11/12 p-4 flex flex-col items-center justify-center font-bebas text-white bg-[#ffffff13] backdrop-blur xl:w-full">
              <h1 className="xxs:text-lg text-xl lg:text-2xl text-[#ffffff4f]">
                RELEASE
              </h1>
              <h1 className="xxs:text-xl text-2xl lg:text-3xl">
                {details.release_date}
              </h1>
            </div>
            <div className="rounded-xl w-11/12 p-4 flex flex-col items-center justify-center font-bebas text-white bg-[#ffffff13] backdrop-blur xl:w-full">
              <h1 className="xxs:text-lg text-xl lg:text-2xl text-[#ffffff4f]">
                Language
              </h1>
              <h1 className="xxs:text-xl text-2xl uppercase lg:text-3xl">
                {targetLanguage}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
