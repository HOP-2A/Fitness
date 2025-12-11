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
  const { push } = useRouter();
  const { user: clerkUser } = useUser();

  const user = useAuth(clerkUser?.id);

  if (user === null) {
    push("/welcome");
  }
  const [teacher, setTeacher] = useState<Teacher[]>([]);

  useEffect(() => {
    const getTeacher = async () => {
      const res = await fetch("/api/teacher");
      const data: Teacher[] = await res.json();
      setTeacher(data);
    };
    getTeacher();
  }, []);
  return (
    <div>
      <Todolist teacherId={user?.id ?? ""} />

      <div>asd</div>

      <Footer />
    </div>
  );
};
export default Page;
