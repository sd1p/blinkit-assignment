import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

// interface reqBody {
//   userId: string;
// }

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userId = req.nextUrl.pathname.split("/")[3];
    const images = await prisma?.image.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(images, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
