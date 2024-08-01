import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      {" "}
      <SignUp />
    </div>
  );
}
