"use client";
import { IMessage } from "@/interfaces";
import { IChatState } from "@/redux/chatSlice";
import { GetChatMessagesById } from "@/server-actions/messages";
import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  const getMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetChatMessagesById(selectedChat?._id!);
      if (response.error) throw new Error(response.error);
      console.log("msgs", response);
      setMessages(response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedChat?._id]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-3 p-3">
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
      </div>
    </div>
  );
}
