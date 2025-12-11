import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, username, password, type } = await req.json();

  const client = await clerkClient();
  console.log(email, username, password, type);
  const user = await client.users.createUser({
    emailAddress: [email],
    password,
    skipPasswordChecks: true,
    skipPasswordRequirement: true,
    publicMetadata: {
      role: type,
    },
  });

  if (!email || !username || !password)
    return NextResponse.json(
      { message: `all fields should be filled` },
      { status: 400 }
    );

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail)
    return NextResponse.json(
      { message: `email already exist nega` },
      { status: 400 }
    );

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername)
    return NextResponse.json(
      { message: `User already taken` },
      { status: 400 }
    );

  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email,
      username,
    },
  });

  return NextResponse.json(
    { message: `User created successfully ${newUser}` },
    { status: 200 }
  );
}
