"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";
import { Footer } from "../_components/Footer";
import CoinPage from "../_components/ShowCoin";

const Page = () => {
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#192126]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-sm mx-auto mt-24 px-4 w-full"
      >
        <Card className="rounded-3xl border border-[#3B434D] bg-[#1E272E] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
          <CardContent className="p-8 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#A3FFAB]/20 blur-md" />
              <Avatar className="w-28 h-28 border-4 border-[#3B434D] relative">
                <AvatarImage src={user?.profilePicture || undefined} />
                <AvatarFallback className="text-2xl font-semibold bg-[#2C333A] text-[#A3FFAB]">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-semibold text-[#A3FFAB]">
                @{user?.username}
              </h2>
              <p className="text-sm text-gray-400">User profile</p>
            </div>

            <div className="w-full space-y-4 text-sm">
              <div className="flex items-start gap-3 rounded-xl border border-[#3B434D] px-4 py-3 bg-[#192126]">
                <User className="w-4 h-4 text-[#A3FFAB] mt-1" />
                <span className="text-gray-200 break-all">{user?.clerkId}</span>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[#3B434D] px-4 py-3 bg-[#192126]">
                <Mail className="w-4 h-4 text-[#A3FFAB] mt-1" />
                <span className="text-gray-200 break-all">{user?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="fixed top-17 right-4.5 z-50">
          <CoinPage />
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Page;
