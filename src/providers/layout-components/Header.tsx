"use client";
import { IUser } from "@/interfaces/user.interface";
import { GetCurrentUserFromMongoDb } from "@/server-actions/users";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./CurrentUserInfo";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isPublicRouter =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [showCurrentUserInfo, setShowCcurrentUserInfo] =
    useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const res = await GetCurrentUserFromMongoDb();
      if (res.error) throw new Error(res.error);
      setCurrentUser(res);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
          <span> {currentUser?.name}</span>
          <Avatar
            src={currentUser?.profilePicture}
            className="cursor-pointer"
            onClick={() => setShowCcurrentUserInfo(true)}
          />
          {/* <SignedOut>
            <SignInButton>
              <button className="bg-primary w-28 px-4 py-2 border-0 text-xl rounded-md">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </div>

      {showCurrentUserInfo && (
        <CurrentUserInfo
          currentUser={currentUser}
          showCurrentUserInfo={showCurrentUserInfo}
          setShowCurrentUserInfo={setShowCcurrentUserInfo}
        />
      )}
    </div>
  );
}
