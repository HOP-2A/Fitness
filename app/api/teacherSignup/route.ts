import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, adminName, password } = await req.json();
  if (!email || !adminName || !password)
    return NextResponse.json(
      { message: "all fields should be filled" },
      { status: 400 }
    );

  const existingEmail = await prisma.teacher.findUnique({
    where: { email },
  });

  if (existingEmail)
    return NextResponse.json(
      { message: "email already exist" },
      { status: 400 }
    );

  const existingAdminname = await prisma.teacher.findFirst({
    where: { adminName },
  });

  if (existingAdminname)
    return NextResponse.json(
      { message: `User already taken` },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const NewTeacher = await prisma.teacher.create({
    data: {
      email,
      adminName,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: `Teacher created succesfully ${NewTeacher}` },
    { status: 200 }
  );
}
