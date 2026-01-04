import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, exerciseId, authorId, parentId } = body;

    if (!content || !exerciseId || !authorId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const comment = await prisma.exerciseComment.create({
      data: {
        content,
        exerciseId,
        authorId,
        parentId: parentId ?? null,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[ADD_COMMENT_ON_EXERCISE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
