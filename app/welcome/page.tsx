"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";

export const Welcome = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

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

  if (user) {
    router.push("/");
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 bg-[#192126]">
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-sm font-medium text-white/80 tracking-wide">
              Sign up as
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/signup")}
              className="
        px-4 py-2 text-sm rounded-lg font-semibold
        bg-gradient-to-r from-[#BBF246] to-[#8EE63A]
        text-black
        transition-all duration-300
        hover:scale-[1.05]
        hover:cursor-pointer
      "
            >
              Trainer
            </Button>

            <Button
              onClick={() => router.push("/teacher/signup")}
              className="
        px-4 py-2 text-sm rounded-lg font-semibold
        hover:cursor-pointer
        bg-[#222A30] border border-white/10 text-white
        transition-all duration-300
        hover:bg-[#2D353B] hover:scale-[1.05]
      "
            >
              Teacher
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <Image
          src="/Image.png"
          alt="Welcome"
          width={260}
          height={260}
          className="rounded-2xl shadow-xl border border-[#5E6468]/40"
        />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#BBF246] drop-shadow-sm">
            Wherever you are, health is number one
          </h1>
          <p className="text-[#8B8F92] text-lg">
            There is no instant way to a healthy life
          </p>
        </div>
        <SignedOut>
          <SignInButton>
            <button
              className="w-full py-5 text-lg rounded-xl bg-[#BBF246] text-black 
            font-semibold hover:bg-[#BBF246]/80 hover:scale-[1.03]
            transition-all duration-300 shadow-md hover:cursor-pointer"
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <div className="mt-2 text-sm text-[#A48AED]">
          Start your fitness journey today ✦
        </div>
      </div>
    </div>
  );
};

export default Welcome;
