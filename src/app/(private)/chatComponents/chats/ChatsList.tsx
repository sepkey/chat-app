"use client";
import { IChatState, setChats } from "@/redux/chatSlice";
import { IUserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chats";
import { message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";

export default function ChatsList() {
  const dispatch = useDispatch();
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  const { chats }: IChatState = useSelector((state: any) => state.chat);
  const [loading, setLoading] = useState(false);

  const getChats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await GetAllChats(currentUserData?._id!);
      console.log(res, "res");
      if (res.error) throw new Error(res.error);
      dispatch(setChats(res));
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUserData?._id, dispatch]);

  useEffect(() => {
    if (currentUserData) getChats();
  }, [getChats, currentUserData]);
  return (
    <div>
      {chats.length > 0 && (
        <div className="flex flex-col gap-5 mt-5">
          {chats.map((chat) => (
            <div key={chat._id}>
              <ChatCard chat={chat} key={chat._id} />
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center mt-32">
          <div className="flex flex-col">
            <Spin />
            <span className="text-sm text-gray-500 my-5">loading chats...</span>
          </div>
        </div>
      )}
    </div>
  );
}
