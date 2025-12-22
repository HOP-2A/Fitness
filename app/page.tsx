"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GetAssignedExercise from "./_components/GetAssignedExercise";


const Page = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  if (clerkUser?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#040506]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#BBF246]" />
          
          <span className="text-sm tracking-wide text-white/70">
            Loading...
          </span>
        
        </div>
      </div>
    );
  }

  return <GetAssignedExercise />;
};

export default Page;
