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

  const addProductPush = () => push("/teacher/addProduct");

  return (
    <div className="min-h-screen bg-[#1F262C] text-white relative flex flex-col p-8">
      <div className="flex justify-between p-6">
        <div className="flex flex-col">
          <span className="text-2xl font-bold flex">Dashboard</span>
          <Greeting />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleGiveExercise}
            className="px-6 py-3 mt-4 bg-[#A3FFAB] text-[#0F1419] font-bold rounded-lg hover:bg-[#8AE086] transition-colors shadow-md shadow-[#A3FFAB]/50"
          >
            Give Exercise
          </button>
          <button
            onClick={addProductPush}
            className="px-6 py-3 mt-4 bg-[#A3FFAB] text-[#0F1419] font-bold rounded-lg hover:bg-[#8AE086] transition-colors shadow-md shadow-[#A3FFAB]/50"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <GetStudent />
        </div>
        <div>
          <Todolist teacherId={user?.id ?? ""} />
        </div>
      </div>
    </div>
  );
};

export default Page;
