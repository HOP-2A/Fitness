import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    const updatedExercise = await prisma.assignedExercise.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise status:", error);
    return NextResponse.json(
      { error: "Failed to update exercise status" },
      { status: 500 }
    );
  }
}
