"use client";
import "../globals.css";
import { LeftBar } from "@/app/chat/ui/left-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center h-full">
      <div className="w-1/6 bg-zinc-900 hidden sm:hidden md:block">
        <LeftBar className="text-white w-1/6" />
      </div>
      <div className="md:w-5/6 w-full max-h-screen">{children}</div>
    </div>
  );
}
