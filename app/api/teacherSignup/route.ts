import { prisma } from "@/app/lib/route";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, adminName, password } = await req.json();
  if (!email || !adminName || !password)
    return NextResponse.json("all fields should be filled");

  const existingEmail = await prisma.teacher.findUnique({
    where: { email },
  });

  if (existingEmail) return NextResponse.json("email already exist");

  const existingAdminname = await prisma.teacher.findFirst({
    where: { adminName },
  });

  if (existingAdminname) return NextResponse.json("user already taken");

  const hashedPassword = await bcrypt.hash(password, 10);

  const NewTeacher = await prisma.teacher.create({
    data: {
      email,
      adminName,
      password: hashedPassword,
    },
  });

  return NextResponse.json(`Teacher created successfully ${NewTeacher}`);
}
