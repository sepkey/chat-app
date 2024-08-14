import { IChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";

export default function NewMessageForm() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  return <div>ss</div>;
}
