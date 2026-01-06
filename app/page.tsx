"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GetAssignedExercise from "./_components/GetAssignedExercise";
import { Footer } from "./_components/Footer";
import ShowCarousel from "./_components/Carousel";

const Page = () => {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();

  if (clerkUser?.publicMetadata.role === "TEACHER") {
    router.push("/teacher");
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-emerald-500" />
            <div className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-emerald-500/20" />
          </div>
          <span className="text-sm font-medium tracking-wide text-emerald-400">
            Loading your dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />

        <div className="relative">
          <GetAssignedExercise />
        </div>
      </div>

      <div className="relative bg-slate-950">
        <div className="ml-64 max-w-[1350px] mr-7 py-10">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              🛍️ Shop & Rewards
            </h2>
            <p className="text-slate-400">
              Spend your earned coins on amazing fitness gear
            </p>
          </div>
          <ShowCarousel />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
