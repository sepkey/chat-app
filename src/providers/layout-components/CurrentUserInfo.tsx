import { IUserState } from "@/redux/userSlice";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: Dispatch<SetStateAction<boolean>>;
};

export default function CurrentUserInfo({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  const getProperty = (key: string, value: string): ReactNode => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };

  const onLogout = async () => {
    try {
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("Logged out successfully!");
      router.push("/sign-in");
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="Profile"
    >
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex  flex-col justify-center items-center">
            <img
              src={currentUserData.profilePicture}
              alt="profile picture"
              className="w-28 h-28 rounded-full "
            />
            <span className="text-gray-500 cursor-pointer">
              Change profile picture
            </span>
          </div>

          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData.name)}
            {getProperty("User Name", currentUserData.userName)}
            {getProperty("ID", currentUserData._id)}
            {getProperty(
              "Joined on",
              dayjs(currentUserData.createdAt).format("DD MM YYYY hh:mm A")
            )}
          </div>
          <div className="mt-2">
            <Button
              className="w-full"
              loading={loading}
              onClick={onLogout}
              danger
              block
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
