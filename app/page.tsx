"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GetAssignedExercise from "./_components/GetAssignedExercise";
import { Footer } from "./_components/Footer";
import CoinPage from "./_components/ShowCoin";

const Page = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();

  if (clerkUser?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#192126]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B434D] border-t-[#A3FFAB]" />
          <span className="text-sm tracking-wide text-[#A3FFAB]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#192126] text-white">
      <div className="top-4 left-4">
        <GetAssignedExercise />
      </div>
      <Footer />
      <CoinPage />
    </div>
  );
};

export default Page;
