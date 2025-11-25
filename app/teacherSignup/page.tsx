"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export const SignUp = () => {
  const { push } = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    adminName: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch("/api/teacherSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Signed up successfully");

      setInputs({
        email: "",
        adminName: "",
        password: "",
      });
    } else {
      toast.error(data.error || "Error while signing up");
    }

    setIsLoading(false);
    push("/teacherLogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#192126]">
      <div className="w-full max-w-sm flex flex-col gap-5 p-8 rounded-3xl shadow-2xl border border-[#5E6468]/40 bg-[#384046]/60 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-[#BBF246] text-center drop-shadow-lg">
          Welcome
        </h1>
        <p className="text-center text-[#8B8F92]">
          Fill the inputs to sign up as a teacher.
        </p>
        <Input
          placeholder="Email"
          name="email"
          onChange={handleInputs}
          value={inputs.email}
          className="bg-[#192126] border border-[#5E6468] text-white placeholder:text-[#8B8F92]"
        />
        <Input
          placeholder="adminName"
          name="adminName"
          onChange={handleInputs}
          value={inputs.adminName}
          className="bg-[#192126] border border-[#5E6468] text-white placeholder:text-[#8B8F92]"
        />
        <Input
          placeholder="Password"
          name="password"
          onChange={handleInputs}
          value={inputs.password}
          type="password"
          className="bg-[#192126] border border-[#5E6468] text-white placeholder:text-[#8B8F92]"
        />

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-5 text-lg rounded-xl font-semibold bg-[#BBF246] hover:bg-[#BBF246]/80 text-black"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>

        <div className="text-center text-sm text-[#A48AED] hover:text-[#FCC46F] transition">
          Have a teacher account already?{" "}
          <Link
            href="/teacherLogin"
            className="font-semibold hover:text-[#BBF246]"
          >
            Login as a teacher
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
