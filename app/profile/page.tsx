import {
  getLikedMovies,
  getPlaylists,
  getWatchedMovies,
} from "@/app/actions/getProfileInfos";
import getCurrentUser from "../actions/getCurrentUser";
import ProfilePage from "../components/ProfilePage";
import { genres } from "@/constants/genres";
import { getMovieDetails } from "../actions/getMovies";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const likedMovies = await getLikedMovies();
  const watchedMovies = await getWatchedMovies();
  const playlists = await getPlaylists();

  const likedGenre: { id: string; name: string } | undefined = genres.find(
    (genre) => genre.id === currentUser?.genre
  );

  const detailsLikedMovies = await Promise.all(
    likedMovies!.map((item: string) => getMovieDetails(item))
  );
  const detailsWatchedMovies = await Promise.all(
    watchedMovies!.map((item: string) => getMovieDetails(item))
  );

  return (
    <div className="min-h-full md:max-h-full md:overflow-x-hidden flex flex-row justify-center bg-[#090A24]">
      <ProfilePage
        currentUser={currentUser}
        likedGenre={likedGenre!.name}
        likedMovies={detailsLikedMovies}
        watchedMovies={detailsWatchedMovies}
        playlists={playlists}
      />
    </div>
  );
}
