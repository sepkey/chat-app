"use server";
import UserModel from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export const GetCurrentUserFromMongoDb = async () => {
  try {
    const clerkUser = await currentUser();

    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    let email = "";
    if (clerkUser?.emailAddresses && clerkUser?.emailAddresses.length) {
      email = clerkUser?.emailAddresses[0].emailAddress;
    }
    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
      userName: clerkUser?.username,
      email: email,
      profilePicture: clerkUser?.imageUrl,
    };

    const newUser = await UserModel.create(newUserPayload);

    return JSON.parse(JSON.stringify(newUser));
  } catch (err: any) {
    return { error: err.message };
  }
};
export const GetAllUsers = async () => {
  try {
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (err: any) {
    return { error: err.message };
  }
};
