"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData?.user;

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Username: {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Coins: {user.coin}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Page;
