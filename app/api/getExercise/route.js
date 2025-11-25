import { NextResponse } from "next/server";
import { prisma } from "@/lib/route";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const traineeId = url.searchParams.get("traineeId");

    if (!traineeId) {
      return NextResponse.json({ error: "Alda garla nigre" }, { status: 400 });
    }

    const exercises = await prisma.assignedExercise.findMany({
      where: { traineeId },
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    return NextResponse.json(
      { error: "Serverder alda garashas" },
      { status: 500 }
    );
  }
};
