"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Todolist from "../_components/Todolist";
import Greeting from "../_components/Greeting";
import { useAuth } from "@/providers/authProvider";
import { GetStudent } from "../_components/GetStudent";
import AddProductPage from "../_components/AddProduct";

const Page = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const { push } = useRouter();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;
  console.log(clerkUser?.id);
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#A3FFAB]" />
          <span className="text-sm tracking-wide text-white/70">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const handleGiveExercise = () => push("/teacher/exercise");

  return (
    <div className="min-h-screen bg-[#192126] text-white relative flex flex-col items-center p-8">
      <Greeting />

      <button
        onClick={handleGiveExercise}
        className="px-6 py-3 mt-4 bg-[#A3FFAB] text-[#0F1419] font-bold rounded-lg hover:bg-[#8AE086] transition-colors shadow-md shadow-[#A3FFAB]/50"
      >
        Give Exercise
      </button>

      <div className="fixed top-45 left-34 z-50 animate-slide-in">
        <GetStudent />
      </div>

      <div className="fixed bottom-20 top-45 right-34 w-80">
        <Todolist teacherId={user?.id ?? ""} />
      </div>
      <AddProductPage />
    </div>
  );
};

export default Page;
