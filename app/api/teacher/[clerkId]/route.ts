import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ clerkId: string }> }
) {
  const { clerkId } = await context.params;
  console.log(clerkId);
  if (!clerkId) {
    return NextResponse.json(
      { error: "Missing clerkId parameter" },
      { status: 400 }
    );
  }

  const teacher = await prisma.teacher.findFirst({
    where: { clerkId },
    select: {
      id: true,
      adminName: true,
      email: true,
    },
  });

  if (!teacher) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ teacher }, { status: 200 });
}
