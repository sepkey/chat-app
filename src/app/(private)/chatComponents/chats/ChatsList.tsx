"use client";
import { IChatState, setChats } from "@/redux/chatSlice";
import { IUserState } from "@/redux/userSlice";
import { GetAllChats } from "@/server-actions/chats";
import { message } from "antd";
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
    getChats();
  }, [getChats, currentUserData]);
  return (
    <div>
      <div className="flex flex-col gap-5 mt-5">
        {chats.map((chat) => (
          <div key={chat._id}>
            <ChatCard chat={chat} key={chat._id} />
          </div>
        ))}
      </div>
    </div>
  );
}
