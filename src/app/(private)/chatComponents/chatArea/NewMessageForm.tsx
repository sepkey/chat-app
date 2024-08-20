"use client";
import { IChatState } from "@/redux/chatSlice";
import { IUserState } from "@/redux/userSlice";
import { SendNewMessage } from "@/server-actions/messages";
import { Button, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function NewMessageForm() {
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const [text, setText] = useState("");

  const onSend = async () => {
    try {
      const dbPayload = {
        text,
        image: "",
        sender: currentUserData?._id!,
        chat: selectedChat?._id!,
      };
      const response = await SendNewMessage(dbPayload);

      if (response.error) throw new Error(response.error);
      setText("");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="p-3 bg-gray-100 border-0 border-t border-solid border-gray-200 flex items-center gap-5">
      <div>emoji</div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="flex-1 w-full h-[45px] border border-solid border-gray-300 focus:outline-none focus:border-primary px-5 rounded-sm "
      />
      <Button type="primary" onClick={onSend}>
        SEND
      </Button>
    </div>
  );
}
