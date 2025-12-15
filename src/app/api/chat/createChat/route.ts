import { getUserSessionId } from "@/shared/lib/auth/get-user-session-id";
import { prisma } from "@/shared/lib/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "[CREATE_CHAT]: request body is missing",
          error: true,
        },
        { status: 400 }
      );
    }

    const { chatId, title } = body;

    if (!chatId) {
      return NextResponse.json(
        {
          message: "[CREATE_CHAT]: chatId is missing",
          error: true,
        },
        {
          status: 400,
        }
      );
    }

    if (!title) {
      return NextResponse.json(
        {
          message: "[CREATE_CHAT]: title is missing",
          error: true,
        },
        {
          status: 400,
        }
      );
    }

    const userId = await getUserSessionId();

    if (!userId) {
      return NextResponse.json(
        {
          message: "[CREATE_CHAT]: userId is missing",
          error: true,
        },
        { status: 400 }
      );
    }

    const result = await prisma.chats.create({
      data: {
        chatId,
        title,
        userId: Number(userId),
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 500 }
    );
  }
}
