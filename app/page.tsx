"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData.user;
  // if (!user) {
  //   router.push("/welcome");
  // }

  if (clerkUser?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1419]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#BBF246]" />

          <span className="text-sm tracking-wide text-white/70">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-sm mx-auto"
    >
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.profilePicture || undefined} />
            <AvatarFallback className="text-xl font-semibold">
              <AvatarFallback>
                <div>{initials}</div>
              </AvatarFallback>
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-xl font-semibold">@{user?.username}</h2>
            <p className="text-sm text-muted-foreground">User profile</p>
          </div>

          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{user?.clerkId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{user?.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Page;
