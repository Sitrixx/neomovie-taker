import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, genre } = body;

  const user = await prisma.user.update({
    data: {
      genre,
      isFirstTime: false,
    },
    where: {
      email,
    },
  });

  return NextResponse.json(user);
}
