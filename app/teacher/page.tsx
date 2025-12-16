"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";
import Greeting from "../_components/Greeting";
import { useAuth } from "@/providers/authProvider";

const Page = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const { push } = useRouter();
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

  const handleGiveExercise = () => push("/teacher/exercise");

  return (
    <div>
      <div className="relative min-h-screen bg-green-50 text-green-800 flex flex-col items-center p-8">
        <Greeting />
        <button
          onClick={handleGiveExercise}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors mt-4"
        >
          Give Exercise
        </button>
        <div className="absolute bottom-20 top-3 right-4 w-80">
          <Todolist teacherId={user?.id ?? ""} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
