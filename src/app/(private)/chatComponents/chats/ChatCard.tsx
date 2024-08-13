import { IChat } from "@/interfaces";
import { IUserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";

type Props = {
  chat: IChat;
};
export default function ChatCard({ chat }: Props) {
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  let chatName = "";
  let chatImage = "";

  // TODO: for last message
  let lastMessage = "";
  let lastMessageSenderId = "";
  let lastMessageTime = "";

  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatImage = chat.groupProfilePicture;
  } else {
    const recieptant = chat.users.find(
      (user) => user._id !== currentUserData?._id
    );
    chatName = recieptant?.name!;
    chatImage = recieptant?.profilePicture!;
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <img
          src={chatImage}
          alt="profile of user"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div>
        <span>{lastMessage}</span>
        <span>{lastMessageTime}</span>
      </div>
    </div>
  );
}
