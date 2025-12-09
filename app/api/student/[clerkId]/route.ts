import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ clerkId: string }> }
) {
  const { clerkId } = await context.params;

  if (!clerkId) {
    return NextResponse.json(
      { error: "Missing clerkId parameter" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: { clerkId },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
