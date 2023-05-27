import prisma from "@/lib/prisma/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getLikedMovieById(id: string) {
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

    const filteredArray = likedMovies?.likedMovies.filter(
      (item) => item === id
    );

    const idExists = filteredArray!.length > 0;

    return idExists;
  } catch (error: any) {
    return [];
  }
}

export async function getWatchedMovieById(id: string) {
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

    const filteredArray = watchedMovies?.watchedMovies.filter(
      (item) => item === id
    );

    const idExists = filteredArray!.length > 0;

    return idExists;
  } catch (error: any) {
    return [];
  }
}
