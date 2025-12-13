"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";

import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user: clerkUser } = useUser();

  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  return (
    <div>
      <Todolist teacherId={user?.id ?? ""} />

      <Footer />
    </div>
  );
};
export default Page;
