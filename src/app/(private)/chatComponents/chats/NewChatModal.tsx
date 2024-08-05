"use client";
import { IUser } from "@/interfaces";
import { IUserState } from "@/redux/userSlice";
import { GetAllUsers } from "@/server-actions/users";
import { Button, Divider, message, Modal, Spin } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

type Props = {
  showNewChatModal: boolean;
  setShowNewChatModal: Dispatch<SetStateAction<boolean>>;
};
export default function NewChatModal({
  setShowNewChatModal,
  showNewChatModal,
}: Props) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const { currentUserId }: IUserState = useSelector((state: any) => state.user);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await GetAllUsers();
      if (res.err) throw new Error("There is no user!");
      console.log(res);
      setUsers(res);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <Modal
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      centered
      title={null}
    >
      <div className="flex flex-col gap-5">
        <h1 className=" text-xl text-center text-primary font-bold uppercase">
          Create New Chat
        </h1>

        {loading && (
          <div className="flex justify-center  my-20">
            <Spin />
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="flex flex-col gap-5">
            {users.map((user) => {
              if (user._id === currentUserId) return null;
              return (
                <React.Fragment key={user._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <img
                        src={user.profilePicture}
                        alt="avatar"
                        className="w-10 h10 rounded-full"
                      />
                      <span className="text-gray-500 text-lg font-bold uppercase">
                        {user.name}
                      </span>
                    </div>
                    <Button size="small">Open the chat</Button>
                  </div>
                  <Divider className="border-gray-200 my-[1px]" />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
