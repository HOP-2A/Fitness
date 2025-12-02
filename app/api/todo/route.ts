import prisma from "@/app/generated/prisma/client";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { task, teacherId } = await req.json();
    const newTodo = await prisma.todo.create({
      data: { task, teacherId },
    });
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.todo.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
