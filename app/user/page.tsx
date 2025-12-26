"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, Router, User } from "lucide-react";
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
        className="flex justify-center mx-auto mt-24 px-4 w-full"
      >
        <Card className="relative w-[800px] rounded-3xl border border-[#3B434D] bg-black overflow-hidden">
          <div className="absolute inset-0 pointer-events-none shadow-[0_0_50px_-15px_rgba(163,255,171,0.18)]" />

          <CardContent className="relative p-8 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#A3FFAB]/25 blur-lg" />
                <Avatar className="w-24 h-24 border-4 border-[#3B434D] relative">
                  <AvatarImage src={user?.profilePicture || undefined} />
                  <AvatarFallback className="text-xl font-semibold bg-[#2C333A] text-[#A3FFAB]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-[#A3FFAB] tracking-wide">
                  @{user?.username}
                </h2>
                <span className="text-sm text-gray-400">Account Overview</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#3B434D] to-transparent" />

            <div className="space-y-4 pl-[7.5rem]">
              <div className="group flex items-start gap-3 rounded-xl border border-[#3B434D] px-4 py-3 bg-[#192126] transition-colors hover:border-[#A3FFAB]/40">
                <User className="w-4 h-4 text-[#A3FFAB] mt-1 shrink-0" />
                <span className="text-gray-200 break-all text-sm">
                  {user?.clerkId}
                </span>
              </div>

              <div className="group flex items-start gap-3 rounded-xl border border-[#3B434D] px-4 py-3 bg-[#192126] transition-colors hover:border-[#A3FFAB]/40">
                <Mail className="w-4 h-4 text-[#A3FFAB] mt-1 shrink-0" />
                <span className="text-gray-200 break-all text-sm">
                  {user?.email}
                </span>
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
