"use client";
import { IChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";

export default function Recipient() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const selectedUser = selectedChat?.users.find(
    (user) => user._id !== selectedChat.createdBy._id
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <img
          src={selectedUser?.profilePicture}
          alt="profile picture"
          className="rounded-full w-12 h-12"
        />
        <span> {selectedUser?.name}</span>
      </div>
    </div>
  );
}
