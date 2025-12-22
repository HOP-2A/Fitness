import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, title, description, target, rate, status, reward } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing exercise id" },
        { status: 400 }
      );
    }

    const updatedExercise = await prisma.assignedExercise.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(target !== undefined && { target }),
        ...(rate !== undefined && { rate }),
        ...(reward !== undefined && { reward }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json({ exercise: updatedExercise }, { status: 200 });
  } catch (error) {
    console.error("EDIT EXERCISE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to edit exercise" },
      { status: 500 }
    );
  }
}
