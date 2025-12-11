import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: { params: { clerkId: string } }
) => {
  const { clerkId } = context.params;

  const student = await prisma.user.findUnique({
    where: { clerkId },
  });

  const teacher = await prisma.teacher.findUnique({
    where: { clerkId },
  });

  if (student) {
    return NextResponse.json(student);
  }

  if (teacher) {
    return NextResponse.json(teacher);
  }
};
