import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ exerciseId: string }> }
) {
  try {
    const { exerciseId } = await context.params;

    if (!exerciseId) {
      return new NextResponse("ExerciseId is required", { status: 400 });
    }

    const comments = await prisma.exerciseComment.findMany({
      where: {
        exerciseId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
