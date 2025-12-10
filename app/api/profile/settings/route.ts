import { getUserSessionId } from "@/shared/lib/auth/get-user-session-id";
import { prisma } from "@/shared/lib/prisma/prisma-client";
import { profileSettingsSchema } from "@/shared/ui/forms/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = profileSettingsSchema.parse(body);

    const userId = await getUserSessionId();
    if (!userId) {
      return NextResponse.json(
        {
          message: "[UPDATE_SETTINGS]: userId is missing",
          error: true,
        },
        { status: 400 }
      );
    }

    const user = await prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "[UPDATE_SETTINGS]: user not found",
          error: true,
        },
        { status: 400 }
      );
    }

    await prisma.users.update({
      data: {
        temperature: Number(validatedData.temperature),
        systemPrompt: String(validatedData.systemPrompt),
      },
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json("Settings is updated", { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserSessionId();
    if (!userId) {
      return NextResponse.json(
        { message: "[GET_SETTINGS]: userId is missing", error: true },
        { status: 401 }
      );
    }

    const user = await prisma.users.findFirst({
      where: { id: Number(userId) },
      select: {
        temperature: true,
        systemPrompt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "[GET_SETTINGS]: user not found", error: true },
        { status: 404 }
      );
    }

    return NextResponse.json({
      temperature: user.temperature,
      systemPrompt: user.systemPrompt,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error", error: true },
      { status: 500 }
    );
  }
}
