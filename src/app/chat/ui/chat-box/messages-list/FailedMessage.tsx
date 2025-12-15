import { RotateCw } from "lucide-react";
import { Message } from "../MessageList";
import { resendMessage, useAppDispatch } from "../../../../store";

interface Props {
  message: Message;
  isAi: boolean;
}

export const FailedMessage = ({ message, isAi }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div
      key={message.id}
      className={`
              flex
              my-5
              rounded-xl
              max-w-full
              text-justify
              text-red-500
              prose prose-invert
              ${
                isAi
                  ? "self-start"
                  : "self-end bg-zinc-800 px-5 py-3 rounded-xl my-5"
              }`}
    >
      {message.text}
      <button
        onClick={(e) => {
          e.preventDefault();
          const currentButton = e.currentTarget as HTMLButtonElement;
          currentButton.classList.add("animate-spin");
          if (!message.id || !message.chatId) {
            currentButton.classList.remove("animate-spin");
            return;
          }
          dispatch(
            resendMessage({
              messageId: message.id,
              chatId: message.chatId,
            })
          );
        }}
        className="ml-2"
      >
        <RotateCw />
      </button>
    </div>
  );
};
