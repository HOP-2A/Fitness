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

    const exercise = await prisma.assignedExercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    if (status === "APPROVE") {
      if (exercise.status === "APPROVE") {
        return NextResponse.json(
          { error: "Exercise already approved" },
          { status: 400 }
        );
      }

      const [userUpdated, exerciseUpdated] = await prisma.$transaction([
        prisma.user.update({
          where: { id: exercise.traineeId },
          data: { coin: { increment: exercise.reward } },
        }),
        prisma.assignedExercise.update({
          where: { id },
          data: { status: "APPROVE" },
        }),
      ]);

      return NextResponse.json({
        success: true,
        newCoin: userUpdated.coin,
        addedCoin: exercise.reward,
        exercise: exerciseUpdated,
      });
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
