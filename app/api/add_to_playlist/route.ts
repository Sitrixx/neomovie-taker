import prisma from "@/lib/prisma/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getPlaylistsMoviesById } from "@/app/actions/getPlaylistsMoviesById";

export async function POST(request: Request) {
  const body = await request.json();

  const { movieId, playlistId } = body;

  const currentUser = await getCurrentUser();
  const playlistMovies = await getPlaylistsMoviesById(playlistId);

  if (!currentUser || !movieId || !playlistId) {
    return NextResponse.error();
  }

  const playlist = [...(playlistMovies || [])];

  if (!playlist.includes(movieId)) {
    playlist.push(movieId);
  } else {
    return NextResponse.json(
      { error: "Movie already added to playlist" },
      { status: 500 }
    );
  }

  const addNewMovie = await prisma.playlists.update({
    data: {
      movies: playlist,
    },
    where: {
      id: playlistId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(addNewMovie);
}
