"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GetAssignedExercise from "./_components/GetAssignedExercise";
import { Footer } from "./_components/Footer";

const Page = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();

  if (clerkUser?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-100 to-green-300">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-500" />
          <span className="text-sm tracking-wide text-green-700">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-green-50">
      <div className=" top-4 left-4">
        <GetAssignedExercise />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
