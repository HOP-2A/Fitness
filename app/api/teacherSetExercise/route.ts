import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { traineeId, teacherId, reward } = body;

  return NextResponse.json("");
}
