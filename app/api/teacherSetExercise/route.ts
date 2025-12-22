import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { traineeId, teacherId, title, description, target, rate, reward } =
    body;

  if (!traineeId || !teacherId || !title) {
    return NextResponse.json(
      { error: "traineeId, teacherId and title are required" },
      { status: 400 }
    );
  }

  const newExercise = await prisma.assignedExercise.create({
    data: {
      traineeId,
      teacherId,
      title,
      description,
      target,
      rate,
      status: "PENDING",
      reward: reward || 0,
    },
  });

  return NextResponse.json(newExercise);
}
