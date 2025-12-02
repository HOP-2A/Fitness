import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  const exercises = await prisma.assignedExercise.findMany();

  return NextResponse.json({ message: exercises, status: 200 });
}
