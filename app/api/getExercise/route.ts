import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/route";

export async function GET() {
  const exercises = await prisma.assignedExercise.findMany();

  return NextResponse.json({ message: exercises, status: 200 });
}
