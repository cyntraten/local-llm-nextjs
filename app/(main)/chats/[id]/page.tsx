import { prisma } from "@/shared/lib/prisma/prisma-client";
import { ChatBoxHeader } from "../../../../src/pages/chat/ui/chat-box/ChatBoxHeader";
import { Metadata } from "next";
import { ChatBoxCreatedChat } from "@/pages/chat/ui/ChatBoxCreatedChat";

interface ChatPageParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: ChatPageParams;
}): Promise<Metadata> {
  try {
    const { id } = await params; // await for Next.js runtime https://nextjs.org/docs/messages/sync-dynamic-apis

    const chat = await prisma.chats.findFirst({
      where: { chatId: id },
      select: { title: true },
    });

    return {
      title: `Local LLM | ${chat?.title || "Chat"}`,
    };
  } catch (e) {
    return {
      title: "Local LLM | Chat not found",
    };
  }
}
export default function Home() {
  return (
    <div className="font-sans min-h-screen py-4 mx-auto max-h-screen flex-col">
      <div className="min-h-[60px] w-full">
        <div className="mb-4">
          <ChatBoxHeader />
        </div>
      </div>
      <div className="flex-grow flex items-center">
        <ChatBoxCreatedChat className="w-full min-h-[200px] flex flex-col justify-center pr-0 pl-0 h-full" />
      </div>
    </div>
  );
}
