import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, adminName, password, type } = await req.json();

    if (!email || !adminName || !password) {
      return NextResponse.json(
        { error: "All fields should be filled" },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    const teacherEmail = await prisma.teacher.findUnique({
      where: { email },
    });

    const userEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (teacherEmail || userEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const existingAdminname = await prisma.teacher.findFirst({
      where: { adminName },
    });

    if (existingAdminname) {
      return NextResponse.json(
        { error: "User already taken" },
        { status: 400 }
      );
    }

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

    await prisma.teacher.create({
      data: {
        email,
        adminName,
        clerkId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Teacher created successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
