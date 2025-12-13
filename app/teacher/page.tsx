"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";
import { useEffect, useState } from "react";

type Teacher = {
  id: string;
  adminName: string;
  email: string;
  createdAt: string;
};
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
