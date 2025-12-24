import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { itemId, quantity } = await req.json();

  if (!itemId) {
    return NextResponse.json({ error: "itemId required" }, { status: 400 });
  }

  const qty = quantity ?? 1;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const item = await prisma.shopItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const totalPrice = item.price * qty;

  if (item.stock < qty) {
    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
  }

  if (user.coin < totalPrice) {
    return NextResponse.json({ error: "Not enough coin" }, { status: 400 });
  }

  const purchase = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: {
        coin: { decrement: totalPrice },
      },
    });

    await tx.shopItem.update({
      where: { id: item.id },
      data: {
        stock: { decrement: qty },
        soldToday: { increment: qty },
      },
    });

    return await tx.purchase.create({
      data: {
        userId: user.id,
        itemId: item.id,
        quantity: qty,
        totalPrice,
      },
    });
  });

  return NextResponse.json({
    message: "Purchase successful",
    purchase,
  });
}
