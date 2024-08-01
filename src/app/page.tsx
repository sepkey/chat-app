import { connectMongoDb } from "@/config/db-config";
import { GetCurrentUserFromMongoDb } from "@/server-actions/users";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
connectMongoDb();

export default async function Home() {
  // const user = await currentUser();

  // let email = "";
  // if (user?.emailAddresses && user?.emailAddresses.length) {
  //   email = user?.emailAddresses[0].emailAddress;
  // }

  const user = await GetCurrentUserFromMongoDb();
  return (
    <div>
      <div className="flex flex-col gap-3 text-3xl">
        <SignedOut>
          <SignInButton>
            <button className="bg-primary w-28 px-4 py-2 border-0 text-xl rounded-md">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {user?.userName && (
          <>
            {/* <span>First name: {user?.firstName}</span> */}
            <span>Last name: {user?.name}</span>
            <span>User name:{user?.userName}</span>
            <span>Email: {user?.email}</span>
          </>
        )}
      </div>
    </div>
  );
}
