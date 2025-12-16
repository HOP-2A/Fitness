import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const User = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ User });
}
