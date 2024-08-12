"use server";
import ChatModel from "@/models/chat.model";

export const CreateNewChat = async (payload: unknown) => {
  try {
    const newChat = await ChatModel.create(payload);
    return JSON.parse(JSON.stringify(newChat));
  } catch (err: any) {
    return { error: err.message };
  }
};

export const GetAllChats = async (userId: string) => {
  try {
    const chats = await ChatModel.find({ users: { $in: [userId] } }).populate(
      "users"
    );
    return JSON.parse(JSON.stringify(chats));
  } catch (err: any) {
    return { error: err.message };
  }
};
