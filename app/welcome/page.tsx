"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser, SignedOut, SignInButton } from "@clerk/nextjs";

export const Welcome = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>loading</div>;
  }
  if (user) {
    router.push("/");
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 bg-[#192126]">
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <div className="flex gap-3">
          <Button
            onClick={() => router.push("/signup")}
            className="
          px-4 py-2 text-sm rounded-lg font-semibold
          bg-gradient-to-r from-[#BBF246] to-[#8EE63A]
          text-black shadow-md shadow-[#BBF246]/30
          transition-all duration-300
          hover:scale-[1.05] hover:shadow-[#BBF246]/50
        "
          >
            Trainer
          </Button>

          <Button
            onClick={() => router.push("/teacher/signup")}
            className="
          px-4 py-2 text-sm rounded-lg font-semibold
          bg-[#222A30] border border-[#5E6468]/40 text-white
          transition-all duration-300
          hover:bg-[#2D353B] hover:scale-[1.05]
        "
          >
            Teacher
          </Button>
        </div>

        <SignedOut>
          <SignInButton>
            <button
              className="
              px-4 py-2 text-sm rounded-lg font-semibold
              bg-[#1F252A] border border-[#5E6468]/40 text-white
              transition-all duration-300
              hover:bg-[#2B3237] hover:scale-[1.05]
            "
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
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

        <Link href="/login" className="w-full">
          <Button
            className="
            w-full py-5 text-lg rounded-xl bg-[#BBF246] text-black 
            font-semibold hover:bg-[#BBF246]/80 hover:scale-[1.03]
            transition-all duration-300 shadow-md
          "
          >
            Get Started
          </Button>
        </Link>

        <div className="mt-2 text-sm text-[#A48AED]">
          Start your fitness journey today ✦
        </div>
      </div>
    </div>
  );
};

export default Welcome;
