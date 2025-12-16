"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";

import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user: clerkUser, isLoaded } = useUser();

  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#BBF246]" />

          <span className="text-sm tracking-wide text-white/70">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Todolist teacherId={user?.id ?? ""} />

      <Footer />
    </div>
  );
};
export default Page;
