import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  movieId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { movieId } = params;

  if (!movieId || typeof movieId !== "string") {
    throw new Error("Invalid ID");
  }

  const likedMovies = [...(currentUser.likedMovies || [])];

  likedMovies.push(movieId);

  const user = await prisma.user.update({
    data: {
      likedMovies,
    },
    where: {
      id: currentUser.id,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { movieId } = params;

  if (!movieId || typeof movieId !== "string") {
    throw new Error("Invalid ID");
  }

  let likedMovies = [...(currentUser.likedMovies || [])];

  likedMovies = likedMovies.filter((id) => id !== movieId);

  const user = await prisma.user.update({
    data: {
      likedMovies,
    },
    where: {
      id: currentUser.id,
    },
  });

  return NextResponse.json(user);
}
