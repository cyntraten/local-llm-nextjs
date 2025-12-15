import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const selectChats = (state: RootState) => state.chats.chats;

export const selectMessagesByChatId = (chatId: string) => {
  return createSelector([selectChats], (chats) => {
    const chat = chats.find((c) => c.chatId === chatId);
    return chat ? chat.messages : [];
  });
};
