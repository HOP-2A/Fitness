import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const exercises = await prisma.assignedExercise.findMany({
    where: {
      traineeId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(exercises);
}
