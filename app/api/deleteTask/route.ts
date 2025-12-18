import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.assignedExercise.delete({ where: { id } });
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
