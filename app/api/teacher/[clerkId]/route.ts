import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { clerkId: string } }
) {
  const { clerkId } = context.params;

  const teacher = await prisma.teacher.findFirst({
    where: {
      clerkId: clerkId,
    },
    select: {
      id: true,
      adminName: true,
      email: true,
    },
  });

  return NextResponse.json({ teacher });
}
