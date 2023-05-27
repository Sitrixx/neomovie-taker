import axios from "axios";
import getCurrentUser from "./getCurrentUser";

export async function getMovieDetails(id: string) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY_TMDB}`
  );
  return res.data;
}

export async function getMovieVideo(id: string) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY_TMDB}`
  );
  return res.data;
}

export async function getMovieCredits(id: string) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY_TMDB}`
  );
  return res.data;
}

export async function getMoviesByGenre() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.genre) {
    return [];
  }

  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1&sort_by=popularity.desc&with_genres=${currentUser.genre}`
  );
  return res.data;
}
