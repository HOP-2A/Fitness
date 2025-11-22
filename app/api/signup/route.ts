import { prisma } from "@/app/lib/route";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();
  if (!email || !username || !password)
    return NextResponse.json("all fields should be filled");

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) return NextResponse.json("email already exist");

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) return NextResponse.json("user already taken");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json(`User created successfully ${newUser}`);
}
