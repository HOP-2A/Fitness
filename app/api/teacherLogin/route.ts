import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/route";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json(
      { message: `All fields are required` },
      { status: 400 }
    );
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
    return NextResponse.json({ message: `teacher not found` }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: `incorrect password` },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: `${teacher}` }, { status: 200 });
}
