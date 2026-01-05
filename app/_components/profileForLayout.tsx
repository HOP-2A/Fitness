"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useAuth } from "@/providers/authProvider";

export const ProfileHeader = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData?.user;

  if (!isLoaded) return null;

  const isTeacher = clerkUser?.publicMetadata.role === "TEACHER";
  console.log(user);
  return (
    <div className="flex items-center gap-3 bg-[#A3FFAB] px-4 py-2 rounded-full shadow-lg">
      <UserButton />

      {!isTeacher ? (
        <div className="flex flex-col text-sm text-blue-600">
          <span className="font-medium">{user?.username}</span>
          <span className="text-gray-700">Coins: {user?.coin ?? 0}</span>
        </div>
      ) : (
        <div className="flex flex-col text-sm text-blue-600">
          <span className="font-medium">{user?.adminName}</span>
        </div>
      )}
    </div>
  );
};
