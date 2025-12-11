"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";

const Page = () => {
  const { push } = useRouter();
  const { user: clerkUser } = useUser();

  const user = useAuth(clerkUser?.id);

  if (user === null) {
    push("/welcome");
  }

  return (
    <div>
      {/* <Todolist teacherId={user?.id ?? ""} /> */}

      <Footer />
    </div>
  );
};
export default Page;
