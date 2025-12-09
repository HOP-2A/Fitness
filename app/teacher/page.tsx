"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import Todolist from "../_components/Todolist";

const Page = () => {
  const { user } = useUser();

  return (
    <div>
      <Todolist teacherId={user?.id ?? ""} />

      <Footer />
    </div>
  );
};
export default Page;
