import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("q");

  const items = await prisma.shopItem.findMany({
    where: {
      productName: {
        contains: search || "",
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(items);
}
