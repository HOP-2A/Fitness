"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";
import Greeting from "../_components/Greeting";
import { useAuth } from "@/providers/authProvider";

type Teacher = {
  id: string;
  adminName: string;
  email: string;
  createdAt: string;
};

const Page = () => {
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const handleGiveExercise = () => router.push("/teacher/exercise");

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
