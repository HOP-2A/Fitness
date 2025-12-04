// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { prisma } from "@/lib/db";

import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { identifier, password } = await req.json();

//   if (!identifier || !password) {
//     return NextResponse.json(
//       { message: " All fields should be filled." },
//       { status: 400 }
//     );
//   }

//   const normalizedIdentifier = identifier.toLowerCase();

//   const user = await prisma.user.findFirst({
//     where: {
//       OR: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }],
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ message: "User not found." }, { status: 400 });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json(
//       { message: "Incorrect password." },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(
//     { message: "Succesfully logged in" },
//     { status: 200 }
//   );
// }
export const GET = () => {
  return NextResponse.json("gg");
};
