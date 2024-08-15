import Messages from "./Messages";
import Recipient from "./Recipient";
import NewMessageForm from "./NewMessageForm";
import { useSelector } from "react-redux";
import { IChatState } from "@/redux/chatSlice";

export default function ChatArea() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" className="w-4/6" />
          <span className="font-semibold text-sm text-gray-600 ">
            Please select a chat!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 ">
      <Recipient />
      <Messages />
      <NewMessageForm />
    </div>
  );
}
