import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();

  const { name } = body;
  const currentUser = await getCurrentUser();

  if (!currentUser || !name) {
    return NextResponse.error();
  }

  const newPlaylist = await prisma.playlists.create({
    data: {
      name: name,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newPlaylist);
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const user = await prisma.user.update({
    data: {},
    where: {
      id: currentUser.id,
    },
  });

  return NextResponse.json(user);
}
