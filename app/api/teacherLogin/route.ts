import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/route";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json("All fields are required.");
  }

  const normalizedIdentifier = identifier.toLowerCase();

  const teacher = await prisma.teacher.findFirst({
    where: {
      OR: [
        { email: normalizedIdentifier },
        { adminName: normalizedIdentifier },
      ],
    },
  });

  if (!teacher) {
    return NextResponse.json("Teacher not found.");
  }

  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) {
    return NextResponse.json("Incorrect password.");
  }

  return NextResponse.json(teacher);
}
