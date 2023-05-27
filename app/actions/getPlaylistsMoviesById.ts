import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prisma/prismadb";

export async function getPlaylistsMoviesById(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const moviesArray = await prisma.playlists.findUnique({
      where: {
        id: id,
      },
    });

    return moviesArray?.movies;
  } catch (error: any) {
    return [];
  }
}
