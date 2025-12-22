import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const Detail = await prisma.assignedExercise.findUnique({
    where: { id },
  });

  if (!Detail) {
    return NextResponse.json(
      { error: "AssignedExercise not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ Detail });
}
