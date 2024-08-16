import { IChatState } from "@/redux/chatSlice";
import { Button } from "antd";
import { useSelector } from "react-redux";

export default function NewMessageForm() {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  return (
    <div className="p-3 bg-gray-100 border-0 border-t border-solid border-gray-200 flex items-center gap-5">
      <div>emoji</div>

      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 w-full h-[45px] border border-solid border-gray-300 focus:outline-none focus:border-primary px-5 rounded-sm "
      />
      <Button type="primary">SEND</Button>
    </div>
  );
}
