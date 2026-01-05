import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const { exerciseId } = params;

    const comments = await prisma.exerciseComment.findMany({
      where: {
        exerciseId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        parentId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[GET_EXERCISE_COMMENTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
