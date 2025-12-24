import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json();

  const teacher = await prisma.teacher.findUnique({
    where: { clerkId: userId },
  });
  if (!teacher)
    return NextResponse.json(
      { error: "Only teacher can post" },
      { status: 403 }
    );

  const product = await prisma.shopItem.create({
    data: {
      productName: body.productName,
      title: body.title,
      image: body.image,
      price: body.price,
      stock: body.stock,
      dailyLimit: body.dailyLimit,
      teacherId: teacher.id,
    },
  });

  return NextResponse.json(product);
}
