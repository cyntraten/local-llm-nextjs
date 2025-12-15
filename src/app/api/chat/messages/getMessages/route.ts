import { getUserSessionId } from "@/shared/lib/auth/get-user-session-id";
import { prisma } from "@/shared/lib/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserSessionId();
    if (!userId) {
      throw new Error("Missing user id");
    }
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("id");
    if (!chatId) {
      throw new Error("Missing chat id");
    }

    const chat = await prisma.chats.findFirst({
      where: {
        chatId,
        user: { id: Number(userId) },
      },
    });

    if (!chat) {
      throw new Error("You are not chat owner");
    }

    const messages = await prisma.messages.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 500 }
    );
  }
}
