import prisma from "@/lib/prisma/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getLikedMovies() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const likedMovies = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    return likedMovies?.likedMovies;
  } catch (error: any) {
    return [];
  }
}

export async function getWatchedMovies() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const watchedMovies = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    return watchedMovies?.watchedMovies;
  } catch (error: any) {
    return [];
  }
}

export async function getPlaylists() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const playlists = await prisma.playlists.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return playlists;
  } catch (error: any) {
    return [];
  }
}
