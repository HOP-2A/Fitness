import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/route";

export async function GET() {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      adminName: true,
      email: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ teachers });
}
