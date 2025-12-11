import { ChatBox } from "@/pages/chat/ui";
import { ChatBoxHeader } from "@/pages/chat/ui/chat-box";

export default function Home() {
  return (
    <div className="font-sans min-h-screen py-4 mx-auto max-h-screen flex-col">
      <div className="min-h-[60px] w-full">
        <div className="mb-4">
          <ChatBoxHeader />
        </div>
      </div>
      <div className="flex-grow flex items-center px-4 py-8">
        <ChatBox className="w-full min-h-[200px] flex flex-col justify-center md:pr-[10%] md:pl-[10%] pr-0 pl-0 h-full" />
      </div>
    </div>
  );
}
