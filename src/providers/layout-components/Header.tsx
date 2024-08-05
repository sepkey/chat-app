"use client";
import { GetCurrentUserFromMongoDb } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./CurrentUserInfo";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IUserState,
  setCurrentUserData,
  setCurrentUserId,
} from "@/redux/userSlice";

export default function Header() {
  const pathname = usePathname();
  const isPublicRouter =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const dispatch = useDispatch();
  const { currentUserData }: IUserState = useSelector(
    (state: any) => state.user
  );
  const [showCurrentUserInfo, setShowCcurrentUserInfo] =
    useState<boolean>(false);

  const getCurrentUser = useCallback(async () => {
    try {
      const res = await GetCurrentUserFromMongoDb();
      if (res.error) throw new Error(res.error);
      dispatch(setCurrentUserData(res));
      dispatch(setCurrentUserId(res._id));
    } catch (error: any) {
      message.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (isPublicRouter) return null;

  return (
    <div className="bg-gray-100 py-1 px-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-primary uppercase">
          SepKey
        </h1>
      </div>
      <div>
        <div className="flex gap-3 items-center">
          <span> {currentUserData?.name}</span>
          <Avatar
            src={currentUserData?.profilePicture}
            className="cursor-pointer"
            onClick={() => setShowCcurrentUserInfo(true)}
          />
        </div>
      </div>

      {showCurrentUserInfo && (
        <CurrentUserInfo
          showCurrentUserInfo={showCurrentUserInfo}
          setShowCurrentUserInfo={setShowCcurrentUserInfo}
        />
      )}
    </div>
  );
}
