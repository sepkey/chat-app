"use server";
import ChatModel from "@/models/chat.model";

export const CreateNewChat = async (payload: any) => {
  try {
    await ChatModel.create(payload);
    const newChats = await ChatModel.find({
      users: { $in: [payload.createdBy] },
    }).populate("users");

    return JSON.parse(JSON.stringify(newChats));
  } catch (err: any) {
    return { error: err.message };
  }
};

export const GetAllChats = async (userId: string) => {
  try {
    const chats = await ChatModel.find({ users: { $in: [userId] } })
      .populate("users")
      .populate("lastMessage")
      .populate({ path: "lastMessage", populate: { path: "sender" } })
      .sort({
        updatedAt: -1,
      });
    return JSON.parse(JSON.stringify(chats));
  } catch (err: any) {
    return { error: err.message };
  }
};
