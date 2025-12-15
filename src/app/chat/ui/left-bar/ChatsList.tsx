"use client";
import { useEffect } from "react";
import Link from "next/link";
import { fetchChats, useAppDispatch, useAppSelector } from "../../../store";
import { Skeleton } from "@/shared/ui/skeleton";

export const ChatsList = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  if (chats.isLoading === "pending") {
    return (
      <Skeleton>
        <ul>
          <li className="bg-gray-500 rounded-md py-1 pl-2 mt-2">
            <div className="block w-full min-h-[14px]"></div>
          </li>
          <li className="bg-gray-500 rounded-md py-1 pl-2 mt-2">
            <div className="block w-full min-h-[14px]"></div>
          </li>
          <li className="bg-gray-500 rounded-md py-1 pl-2 mt-2">
            <div className="block w-full min-h-[14px]"></div>
          </li>
        </ul>
      </Skeleton>
    );
  } else if (chats.isLoading === "succeeded") {
    return (
      <div className="max-h-[60vh]">
        <ul>
          {chats.chats.map((chat) => (
            <li
              className="hover:bg-gray-500 rounded-md py-1 pl-2"
              key={chat.chatId}
            >
              <Link
                href={`/chats/${chat.chatId}`}
                className="block w-full truncate"
              >
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
