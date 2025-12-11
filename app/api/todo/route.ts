import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { task, teacherId } = await req.json();
  if (!teacherId) {
    return NextResponse.json(
      { message: "No teacher Id found" },
      { status: 400 }
    );
  }

  const newTodo = await prisma.todo.create({
    data: { task, teacherId },
  });

  return NextResponse.json(newTodo, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ error: "clerkId olddguie" }, { status: 400 });
  }

  const teacher = await prisma.teacher.findUnique({
    where: {
      clerkId,
    },
  });
  const todos = await prisma.todo.findMany({
    where: { teacherId: teacher?.id },
  });

  return NextResponse.json(todos);
}
