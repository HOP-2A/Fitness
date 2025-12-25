import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type ClerkError = {
  code: string;
  message: string;
};

type ClerkErrorResponse = {
  errors: ClerkError[];
};

export async function POST(req: Request) {
  try {
    const { email, username, password, type } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "All fields should be filled" },
        { status: 400 }
      );
    }

    const [userEmail, teacherEmail] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.teacher.findUnique({ where: { email } }),
    ]);

    if (userEmail || teacherEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password,
      skipPasswordChecks: false,
      skipPasswordRequirement: false,
      publicMetadata: {
        role: type,
      },
    });

    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        username,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("SIGNUP ERROR 👉", err);

    if (
      typeof err === "object" &&
      err !== null &&
      "errors" in err &&
      Array.isArray((err as ClerkErrorResponse).errors)
    ) {
      const clerkError = (err as ClerkErrorResponse).errors[0];

      if (clerkError.code === "form_identifier_exists") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }

      return NextResponse.json({ error: clerkError.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
