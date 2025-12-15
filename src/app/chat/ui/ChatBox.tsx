"use client";
import { useEffect } from "react";
import { Message, MessageList } from "./chat-box/MessageList";
import { SendForm } from "./chat-box/SendForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addMessage,
  asyncCreateChat,
  streamMessage,
} from "../../store/chats/chatsSlice";
import { useParams, useRouter } from "next/navigation";
import { selectMessagesByChatId } from "../../store/chatsSelectors";

interface Props {
  className?: string;
}

export const ChatBox = ({ className }: Props) => {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const isCreatedChat = params?.id ? true : false;

  const chat = useAppSelector((state) =>
    state.chats.chats.find((c) => c.chatId === params?.id)
  );

  const models = useAppSelector((state) => state.models);
  const selectedModel = models.models.find((model) => model.isSelected);

  const allMessages = useAppSelector(selectMessagesByChatId(params?.id ?? ""));
  const messages: Message[] = isCreatedChat ? allMessages : [];

  const handleSend = async (message: string) => {
    if (message.trim() === "") {
      console.log("message is missing");
      return;
    }

    const newMessage = message;

    const chatId = params?.id ? params.id : crypto.randomUUID();
    const nextId = crypto.randomUUID();

    let chatCreated = true;
    if (!isCreatedChat) {
      const result = await dispatch(
        asyncCreateChat({ chatId, title: newMessage })
      );
      chatCreated = result.meta.requestStatus === "fulfilled";
      if (!chatCreated) {
        console.error("Failed to create chat");
        return;
      }
    }

    dispatch(
      addMessage({
        id: nextId,
        text: newMessage,
        owner: "user",
        chatId,
        loading: "succeeded",
      })
    );

    const model = selectedModel?.name;
    if (model) {
      dispatch(streamMessage({ newMessage, model, chatId }));
    } else {
      console.error("No selected model");
    }

    if (!isCreatedChat) {
      navigate.push(`/chats/${chatId}`);
    }
  };

  useEffect(() => {
    if (!params?.id || !chat) return;

    const fetchMessages = async () => {
      if (params?.id) {
        try {
          const res = await fetch(
            `/api/chat/messages/getMessages?id=${params.id}`
          );
          if (!res.ok) {
            navigate.push("/");
            return;
          }

          const messages = await res.json();

          if (!messages || messages.length === 0) {
            navigate.push("/");
            return;
          }
        } catch (e) {
          console.error("Failed to fetch messages", e);
          navigate.push("/");
        }
      }
    };

    fetchMessages();
  }, [chat, params?.id, navigate]);

  return (
    <div className={className}>
      <MessageList
        messages={messages}
        className="flex flex-col text-white gap-2 mt-10 p-2 max-h-[50vh] overflow-auto max-w-full"
      />
      <div className="flex-col gap-2 mt-2 h-full justify-items-center">
        {!isCreatedChat ? (
          <p className="text-2xl">Чем я могу вам помочь?</p>
        ) : (
          ""
        )}
        <SendForm handleSend={handleSend} />
      </div>
    </div>
  );
};
