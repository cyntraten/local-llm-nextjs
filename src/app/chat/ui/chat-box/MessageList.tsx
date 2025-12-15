"use client";

import { FailedMessage } from "./messages-list/FailedMessage";
import { SuccessfulMessage } from "./messages-list/SuccessfulMessage";
import { PendingMessage } from "./messages-list/PendingMessage";

export type Message = {
  id: string;
  text: string;
  owner: "user" | "ai";
  loading: "idle" | "pending" | "succeeded" | "failed";
  createdAt?: string;
  updatedAt?: string;
  chatId?: string;
};

interface Props {
  className?: string;
  messages: Message[];
}

export const MessageList = ({ messages, className }: Props) => {
  return (
    <div className={className}>
      {messages.map((message) => {
        const isAi = message.owner === "ai";
        const messageStatus = message.loading;
        if (messageStatus === "succeeded") {
          return (
            <SuccessfulMessage key={message.id} message={message} isAi={isAi} />
          );
        } else if (messageStatus === "failed") {
          return (
            <FailedMessage key={message.id} message={message} isAi={isAi} />
          );
        } else if (messageStatus === "pending") {
          return <PendingMessage key={message.id} message={message} />;
        }
      })}
    </div>
  );
};
