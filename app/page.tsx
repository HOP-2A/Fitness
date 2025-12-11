"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Student = {
  id: string;
  username: string;
};

const Page = () => {
  const [student, setStudent] = useState<Student | null>();
  const { user } = useUser();
  const router = useRouter();

  if (user === null) {
    router.push("/welcome");
  }
  console.log(user?.publicMetadata.role);
  if (user?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }
  useEffect(() => {
    const getUser = async () => {
      if (!user?.id) return;

      const res = await fetch(`/api/student/${user.id}`);
      if (!res.ok) return;

      const data = await res.json();
      setStudent(data.user);
    };

    getUser();
  }, [user?.id]);

  return <div>{student?.username}</div>;
};

export default Page;
