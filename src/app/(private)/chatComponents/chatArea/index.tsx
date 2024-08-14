import Messages from "./Messages";
import Recipient from "./Recipient";
import NewMessageForm from "./NewMessageForm";
import { useSelector } from "react-redux";
import { IChatState } from "@/redux/chatSlice";

export default function ChatArea() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  return (
    <div className="flex-1 p-3">
      {selectedChat ? (
        <>
          <Recipient />
          <Messages />
          <NewMessageForm />
        </>
      ) : (
        <p className="flex items-center justify-center">
          Please select a chat!
        </p>
      )}
    </div>
  );
}
