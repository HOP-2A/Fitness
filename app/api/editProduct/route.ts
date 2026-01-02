// /app/api/shop/edit.ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, productName, title, image, price, stock, dailyLimit } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Барааны ID алга байна" },
        { status: 400 }
      );
    }

    const updateProduct = await prisma.shopItem
      .update({
        where: { id },
        data: {
          ...(productName !== undefined && { productName }),
          ...(title !== undefined && { title }),
          ...(image !== undefined && { image }),
          ...(price !== undefined && { price: Number(price) }),
          ...(stock !== undefined && { stock: Number(stock) }),
          ...(dailyLimit !== undefined && { dailyLimit: Number(dailyLimit) }),
        },
      })
      .catch(() => null);

    if (!updateProduct) {
      return NextResponse.json({ error: "Бараа олдсонгүй" }, { status: 404 });
    }

    return NextResponse.json({ product: updateProduct }, { status: 200 });
  } catch (error) {
    console.error("There is an error while updating product", error);
    return NextResponse.json(
      { error: "There is an error while updating product " },
      { status: 500 }
    );
  }
}
