import { getUserSessionId } from "@/shared/lib/auth/get-user-session-id";
import { prisma } from "@/shared/lib/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserSessionId();
  const chats = await prisma.chats.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return NextResponse.json(chats);
}
