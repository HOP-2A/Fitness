"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export const Welcome = () => {
  const router = useRouter();
  const { user } = useUser();

  // if (user !== null) {
  //   router.push("/");
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#192126]">
      <div className="max-w-md flex flex-col items-center text-center gap-6">
        <Image
          src={"/Image.png"}
          alt="Welcome"
          width={260}
          height={260}
          className="rounded-2xl shadow-xl border border-[#5E6468]/40"
        />

        <h1 className="text-3xl font-bold text-[#BBF246] drop-shadow-sm">
          Wherever you are, health is number one
        </h1>

        <p className="text-[#8B8F92] text-lg">
          There is no instant way to a healthy life
        </p>

        <Link href="/login" className="w-full">
          <Button className="w-full py-5 text-lg rounded-xl bg-[#BBF246] text-black font-semibold hover:bg-[#BBF246]/80">
            Get Started
          </Button>
        </Link>

        <div className="mt-4 text-sm text-[#A48AED]">
          Start your fitness journey today ✦
        </div>
      </div>
    </div>
  );
};

export default Welcome;
