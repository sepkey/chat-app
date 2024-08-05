import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  showNewChatModal: boolean;
  setShowNewChatModal: Dispatch<SetStateAction<boolean>>;
};
export default function NewChatModal({
  setShowNewChatModal,
  showNewChatModal,
}: Props) {
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
      </div>
    </Modal>
  );
}
