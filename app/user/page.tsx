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
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050B14]">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex justify-center px-4 pt-28"
      >
        <Card className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border border-white/20">
                <AvatarImage src={user?.profilePicture || undefined} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-300 text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-2xl font-semibold text-white">
                  @{user?.username}
                </h2>
                <p className="text-sm text-gray-400">Account Overview</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-4">
              <div className="flex gap-3 items-start rounded-xl border border-white/10 bg-white/5 p-4">
                <User className="w-4 h-4 text-emerald-400 mt-1" />
                <span className="text-sm text-gray-200 break-all">
                  {user?.clerkId}
                </span>
              </div>

              <div className="flex gap-3 items-start rounded-xl border border-white/10 bg-white/5 p-4">
                <Mail className="w-4 h-4 text-emerald-400 mt-1" />
                <span className="text-sm text-gray-200 break-all">
                  {user?.email}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-195 right-6 z-50 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-3">
          <CoinPage />
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Page;
