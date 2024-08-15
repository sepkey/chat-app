"use client";
import { IChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";

export default function Recipient() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat.groupName;
    chatImage = selectedChat.groupProfilePicture;
  } else {
    const recieptant = selectedChat?.users.find(
      (user) => user._id !== selectedChat.createdBy?._id
    );
    chatName = recieptant?.name!;
    chatImage = recieptant?.profilePicture!;
  }

  return (
    <div className="flex justify-between border-0 border-b border-gray-200 px-5 py-3 border-solid bg-gray-400/5">
      <div className="flex items-center gap-5">
        <img
          src={chatImage}
          alt="profile picture"
          className="rounded-full w-10 h-10"
        />
        <span className="text-gray-700 text-sm"> {chatName}</span>
      </div>
    </div>
  );
}
