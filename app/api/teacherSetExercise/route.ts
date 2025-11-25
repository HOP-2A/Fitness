import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/route";

export async function POST(request: Request) {
  const body = await request.json();
  const { traineeId, teacherId, title, description, target, rate } = body;

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
    },
  });

  return NextResponse.json(newExercise);
}
