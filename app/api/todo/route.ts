import { prisma } from "@/app/lib/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get("teacherId");

  if (!teacherId) {
    return NextResponse.json(
      { error: "teacherId is required" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    where: { teacherId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(todos);
}
