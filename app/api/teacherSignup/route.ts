import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, adminName, password, type } = await req.json();

  const client = await clerkClient();
  const user = await client.users.createUser({
    emailAddress: [email],
    password,
    skipPasswordChecks: true,
    skipPasswordRequirement: true,
    publicMetadata: {
      role: type,
    },
  });

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

  const NewTeacher = await prisma.teacher.create({
    data: {
      email,
      adminName,
      clerkId: user.id,
    },
  });

  return NextResponse.json(
    { message: `Teacher created succesfully ${NewTeacher}, ${user}` },
    { status: 200 }
  );
}
