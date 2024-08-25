import { formatDateTime } from "@/helpers/date-formats";
import { IChat } from "@/interfaces";
import { IChatState, setSelectedChat } from "@/redux/chatSlice";
import { IUserState } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  chat: IChat;
};
export default function ChatCard({ chat }: Props) {
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  let chatName = "";
  let chatImage = "";

  // TODO: for last message
  let lastMessage = "";
  let lastMessageSenderName = "";
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

  if (chat.lastMessage) {
    lastMessage = chat.lastMessage.text;
    lastMessageSenderName =
      chat.lastMessage.sender?._id === currentUserData?._id
        ? "You"
        : chat.lastMessage.sender?.name.split(" ")[0];
    lastMessageTime = formatDateTime(chat.lastMessage.createdAt);
  }

  const isSelected = chat._id === selectedChat?._id;

  const unreadCounts = () => {
    if (!chat.unreadCounts || !chat.unreadCounts[currentUserData?._id!]) {
      return null;
    }

    return (
      <div className="bg-red-500 rounded-full h-5 w-5 flex items-center justify-center">
        <span className="text-white text-xs">
          {chat.unreadCounts[currentUserData?._id!]}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`flex justify-between rounded hover:bg-gray-100 p-2 cursor-pointer border border-transparent ${
        isSelected && "bg-gray-100"
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex gap-5 items-center">
        <img
          src={chatImage}
          alt="profile of user"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-gray-700 text-sm">{chatName}</span>
          <span className="text-gray-700 text-sm">
            {lastMessageSenderName}: {lastMessage}
          </span>
        </div>
      </div>
      <div>
        {unreadCounts()}
        <span className="text-xs text-gray-500">{lastMessageTime}</span>
      </div>
    </div>
  );
}
