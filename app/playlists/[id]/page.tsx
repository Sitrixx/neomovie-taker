import { getMovieDetails } from "@/app/actions/getMovies";
import { getPlaylistsMoviesById } from "@/app/actions/getPlaylistsMoviesById";
import DisplayPlaylistsMovies from "@/app/components/DisplayPlaylistsMovies";
import Navbar from "@/app/components/navbar/Navbar";

export default async function Home({ params }: { params: { id: string } }) {
  const playlistMovies = await getPlaylistsMoviesById(params.id);

  const detailsPlaylistsMovies = await Promise.all(
    playlistMovies!.map((item: string) => getMovieDetails(item))
  );

  return (
    <div className="min-h-full md:max-h-full md:overflow-x-hidden flex flex-row justify-center bg-[#090A24] font-poppins">
      <div className="my-8 px-6 md:px-14 w-full min-h-full max-w-screen-2xl mx-auto">
        <Navbar searchBar={false} />
        <DisplayPlaylistsMovies
          detailsPlaylistsMovies={detailsPlaylistsMovies}
        />
      </div>
    </div>
  );
}
