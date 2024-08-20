"use server";
import ChatModel from "@/models/chat.model";
import MessageModel from "@/models/message.model";

export const SendNewMessage = async (payload: {
  text?: string;
  image?: string;
  sender: string;
  chat: string;
}) => {
  try {
    const newMessage = new MessageModel(payload);
    await newMessage.save();
    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
    });
    return { message: "Message sent successfully!" };
  } catch (err: any) {
    return { error: err.message };
  }
};
