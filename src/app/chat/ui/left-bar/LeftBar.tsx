"use client";

import Link from "next/link";
import { ChatsList } from "./ChatsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { UserAuth } from "@/shared/components/user-auth";
import { Logo } from "@/shared/ui/icons/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from "@/shared/ui/sidebar";
import { ProfileSettings } from "@/shared/ui/profile/profile-settings";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export const LeftBar = ({ className }: Props) => {
  const { data: session, status } = useSession();

  return (
    <SidebarProvider>
      <Sidebar className={className}>
        <SidebarHeader>
          <div className="flex justify-between py-3 pl-2 px-2">
            <div>
              <Link href="\">
                <Logo text="LLmw" />
              </Link>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="hover:cursor-pointer"
              ></button>
            </div>
          </div>
          <SidebarGroup className="pl-0">
            <Link
              href="/"
              className="hover:bg-gray-500 rounded-md p-2 mt-2 block w-full"
            >
              New chat
            </Link>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent className="">
          <Collapsible defaultOpen={true}>
            <SidebarGroup>
              <SidebarGroupLabel asChild className="text-gray-400">
                <CollapsibleTrigger className="group">
                  Chats
                  <ChevronDown className="ml-auto transition-transform" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <ChatsList />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          {status === "loading" ? null : session ? (
            <SidebarMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="border-none outline-none hover:opacity-80 hover:cursor-pointer hover:bg-gray-800 rounded-xl h-10">
                    <UserAuth session={session} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] outline-none"
                >
                  <DropdownMenuItem asChild>
                    <ProfileSettings>
                      <div className="flex outline-none items-center hover:cursor-pointer hover:bg-gray-800 rounded-xl p-2 ">
                        <Settings width={24} />
                        <span className="ml-2">Settings</span>
                      </div>
                    </ProfileSettings>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onClick={() => signOut()}>
                    <div className="w-full flex outline-none items-center hover:cursor-pointer hover:bg-gray-800 rounded-xl ml-1 p-2">
                      <LogOut />
                      <span className="ml-1 text-[16px]">SignOut</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          ) : (
            <Link href="/login">
              <SidebarMenuButton className="hover:opacity-80 hover:cursor-pointer hover:bg-gray-800 rounded-xl h-10">
                Login
              </SidebarMenuButton>
            </Link>
          )}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
