"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export const SignUp = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (user !== null) {
    router.push("/teacher");
  }

  const [inputs, setInputs] = useState({
    email: "",
    adminName: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await fetch("/api/teacherSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...inputs,
        type: "TEACHER",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Signed up successfully now login please");
      router.push("/welcome");
    } else {
      toast.error(data.error || "Error while signing up");
    }

    setIsLoading(false);
  };

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
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#192126]">
      <div className="w-full max-w-sm flex flex-col gap-5 p-8 rounded-3xl shadow-2xl border border-[#5E6468]/40 bg-[#384046]/60">
        <h1 className="text-3xl font-bold text-[#BBF246] text-center">
          Welcome
        </h1>

        <Input
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputs}
          className="bg-[#192126] text-white"
        />

        <Input
          name="adminName"
          placeholder="Admin Name"
          value={inputs.adminName}
          onChange={handleInputs}
          className="bg-[#192126] text-white"
        />

        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={inputs.password}
          onChange={handleInputs}
          className="bg-[#192126] text-white"
        />

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-5 bg-[#BBF246] text-black"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>

        <div className="text-center text-sm text-[#A48AED]">
          Already a teacher?{" "}
          <Link href="/welcome" className="font-semibold hover:text-[#BBF246]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
