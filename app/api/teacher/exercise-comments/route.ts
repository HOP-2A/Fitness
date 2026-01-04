import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const comments = await prisma.exerciseComment.findMany({
      where: {
        parentId: null,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
        replies: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            authorId: true,
            createdAt: true,
          },
        },
        exercise: {
          select: {
            id: true,
            title: true,
            description: true,
            teacherId: true,
            trainee: {
              select: { username: true },
            },
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[TEACHER_EXERCISE_COMMENTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
