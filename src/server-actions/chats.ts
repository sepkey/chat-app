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
