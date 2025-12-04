// import { prisma } from "@/lib/db";
// import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, username, password } = await req.json();
//   if (!email || !username || !password)
//     return NextResponse.json(
//       { message: `all fields should be filled` },
//       { status: 400 }
//     );

//   const existingEmail = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingEmail)
//     return NextResponse.json(
//       { message: `User created succesfully` },
//       { status: 200 }
//     );

//   const existingUsername = await prisma.user.findUnique({
//     where: { username },
//   });

//   if (existingUsername)
//     return NextResponse.json(
//       { message: `User already taken` },
//       { status: 400 }
//     );

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       username,
//       password: hashedPassword,
//     },
//   });

//   return NextResponse.json(
//     { message: `User created successfully ${newUser}` },
//     { status: 200 }
//   );
// }

export const GET = () => {
  return NextResponse.json("gg");
};
