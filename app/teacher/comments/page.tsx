"use client";
import TeacherExerciseComments from "@/app/_components/TeacherExerciseComments";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user: clerkUser } = useUser();

  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  return (
    <div>
      <TeacherExerciseComments teacherId={user?.id ?? ""} />
    </div>
  );
};

export default Page;
