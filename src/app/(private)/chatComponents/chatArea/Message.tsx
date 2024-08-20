import { useSelector } from "react-redux";
import { IChatState } from "@/redux/chatSlice";
import { IMessage } from "@/interfaces";
import { IUserState } from "@/redux/userSlice";
import dayjs from "dayjs";

type Props = { message: IMessage };
export default function Message({ message }: Props) {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  const isLoggedInUserMessage = message.sender._id === currentUserData?._id;

  if (isLoggedInUserMessage) {
    return (
      <div className="flex gap-2 justify-end">
        <div className="flex flex-col gap-1">
          <p className="bg-primary text-white py-2 px-5 rounded-tr-none rounded-xl m-0">
            {message.text}
          </p>
          <span className="text-gray-500 text-xs">
            {dayjs(message.createdAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 ">
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-gray-200 py-2 px-5 rounded-tl-none rounded-xl">
            <span className="text-blue-500 text-xs font-semibold">
              {message.sender.name}
            </span>
            <p className="pt-1 m-0 text-sm">{message.text}</p>
          </div>
          <span className="text-gray-500 text-xs">
            {dayjs(message.createdAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
      </div>
    );
  }
}
