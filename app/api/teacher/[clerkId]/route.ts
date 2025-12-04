import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context) {
  const teacher = await prisma.teacher.findFirst({
    where: {
      clerkId,
    },
  });

  return NextResponse.json({ teacher });
}
