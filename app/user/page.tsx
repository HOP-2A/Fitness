"use client";

import { useAuth } from "@/providers/authProvider";
import { useUser } from "@clerk/nextjs";
import { Footer } from "../_components/Footer";
import { Coins, Mail, Calendar, TrendingUp, Award, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = () => {
  const { user: clerkUser } = useUser();
  const userData = useAuth(clerkUser?.id);
  const user = userData?.user;

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="text-slate-400">Loading your profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pl-48">
      <Footer />

      <div className="relative overflow-hidden bg-gradient-to-br">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-blue-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">
                  {user.username}
                </h1>
                <p className="text-slate-300 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">
              Account Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-700">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-slate-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-slate-100 break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-slate-700">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-slate-800 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-400 mb-1">
                    Username
                  </p>
                  <p className="text-slate-100">{user.username}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-slate-800 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-400 mb-1">
                    Account Created
                  </p>
                  <p className="text-slate-100">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
