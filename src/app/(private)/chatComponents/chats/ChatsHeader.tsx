import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import NewChatModal from "./NewChatModal";
import { UserOutlined } from "@ant-design/icons";

export default function ChatsHeader() {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const items: MenuProps["items"] = [
    { label: "New Chat", key: "1", onClick: () => setShowNewChatModal(true) },
    { label: "New Group", key: "2" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-500 font-bold">My Chats</h1>
        <Dropdown.Button
          icon={<UserOutlined />}
          menu={{ items }}
          size="small"
          className="w-max"
        >
          Create New
        </Dropdown.Button>
      </div>
      {showNewChatModal && (
        <NewChatModal
          setShowNewChatModal={setShowNewChatModal}
          showNewChatModal={showNewChatModal}
        />
      )}
    </div>
  );
}
