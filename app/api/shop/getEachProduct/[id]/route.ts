import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const product = await prisma.shopItem.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
