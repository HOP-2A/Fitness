"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";
import { Footer } from "../_components/Footer";

const Page = () => {
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-emerald-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-sm mx-auto mt-24 px-4 w-full"
      >
        <Card className="rounded-3xl border border-emerald-100 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25)]">
          <CardContent className="p-8 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md" />
              <Avatar className="w-28 h-28 border-4 border-emerald-100 relative">
                <AvatarImage src={user?.profilePicture || undefined} />
                <AvatarFallback className="text-2xl font-semibold bg-emerald-100 text-emerald-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-semibold text-emerald-800">
                @{user?.username}
              </h2>
              <p className="text-sm text-emerald-600">User profile</p>
            </div>

            <div className="w-full space-y-4 text-sm">
              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 px-4 py-3 bg-emerald-50/50">
                <User className="w-4 h-4 text-emerald-600" />
                <span className="truncate text-emerald-800">
                  {user?.clerkId}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 px-4 py-3 bg-emerald-50/50">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="truncate text-emerald-800">{user?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Page;
