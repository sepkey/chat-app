export interface IUser {
  _id: string;
  clerkUserId: string;
  name: string;
  userName: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChat {
  _id: string;
  users: IUser[];
  createdBy: IUser;
  lastMessage: IMessage;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  groupBio: String;
  groupAdmins: IUser[];
  unreadCounts: any;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  chat: IChat;
  sender: IUser;
  text: string;
  image: string;
  readBy: IUser[];
  createdAt: string;
  updatedAt: string;
}
