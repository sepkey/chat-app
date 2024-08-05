import React from "react";
import ChatsHeader from "./ChatsHeader";
import ChatsList from "./ChatsList";

export default function Chats() {
  return (
    <div className="w-[300px] h-full p-3">
      <ChatsHeader />
      <ChatsList />
    </div>
  );
}
