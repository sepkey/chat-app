import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <SignIn />
    </div>
  );
}
