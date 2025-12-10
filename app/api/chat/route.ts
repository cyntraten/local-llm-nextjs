import { buildPromptWithSystem } from "@/lib/sendMessages";
import { getUserSessionId } from "@/shared/lib/auth/get-user-session-id";
import { prisma } from "@/shared/lib/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

//TODO DRY
function cleanResponse(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, model, chatId } = body;

    const userId = await getUserSessionId();

    const chat = await prisma.chats.findFirst({
      where: {
        chatId,
        user: { id: Number(userId) },
      },
    });

    if (!chat) {
      return NextResponse.json({
        error: true,
        message: "You are not chat owner",
      });
    }

    if (!prompt) {
      return NextResponse.json({
        error: true,
        message: "User prompt is missing",
      });
    }

    const postResult = await prisma.messages.create({
      data: {
        text: prompt,
        chatId,
        owner: "user",
        loading: "succeeded",
        model,
      },
    });

    const user = await prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
    });

    const promptWithSystem = buildPromptWithSystem(user?.systemPrompt, prompt);

    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await ollama.chat({
            model,
            messages: [{ role: "user", content: promptWithSystem }],
            stream: true,
            options: {
              temperature: user?.temperature || 0.5,
            },
          });

          for await (const part of response) {
            if (part.message?.content) {
              const clean = cleanResponse(part.message.content);
              fullResponse += clean;
              controller.enqueue(encoder.encode(clean));
            }
          }

          await prisma.messages.create({
            data: {
              text: fullResponse,
              chatId,
              owner: "ai",
              loading: "succeeded",
              model,
            },
          });

          controller.close();
        } catch (err) {
          console.error("AI stream error:", err);
          controller.error(err);
          await prisma.messages.update({
            data: { loading: "failed" },
            where: { id: postResult.id },
          });
        }
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
