"use client";
import { connectMongoDb } from "@/config/db-config";
import Chats from "./chatComponents/chats";
import ChatArea from "./chatComponents/chatArea";
import { Divider } from "antd";
connectMongoDb();

export default function Home() {
  return (
    <div className="flex h-[85vh]">
      <Chats />
      <Divider plain type="vertical" className="h-full border-gray-300 " />
      <ChatArea />
    </div>
  );
}
