"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/app/store/hooks";
import { useSendForm } from "@/shared/hooks/useSendForm";
import { SendButton } from "./SendButton";

interface Props {
  handleSend: (newMessage: string) => void;
  className?: string;
  maxRows?: number;
}

export const SendForm = ({ handleSend, className, maxRows = 8 }: Props) => {
  const { data: session } = useSession();
  const { loading } = useAppSelector((state) => state.models);
  const isButtonDisabled = loading === "failed" ? true : false;

  const { newMessage, textareaRef, isMultiline, handleChange, handleSubmit } =
    useSendForm(handleSend, maxRows);

  return (
    <form onSubmit={handleSubmit} className={className || "flex w-full mt-10"}>
      {" "}
      <div
        className={cn(
          "relative w-full bg-gray-500 py-2 px-2 rounded-xl transition-all mb-0",
          isMultiline ? "flex-col" : "flex"
        )}
      >
        {" "}
        <textarea
          id="input"
          rows={1}
          placeholder="Enter your message..."
          className="w-full border-none outline-none resize-none bg-transparent px-2 py-1 rounded text-xl"
          value={newMessage}
          onChange={handleChange}
          ref={textareaRef}
        />{" "}
        <div className="flex justify-end">
          {" "}
          <SendButton
            isLoggedIn={!!session}
            isButtonDisabled={isButtonDisabled}
          />{" "}
        </div>{" "}
      </div>{" "}
    </form>
  );
};
