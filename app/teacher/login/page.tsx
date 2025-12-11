"use client";
import { SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";

const Login = () => {
  const { user } = useUser();
  const { push } = useRouter();

  if (user === null) {
    return (
      <div>
        <SignedOut>
          <SignInButton>Sign in</SignInButton>
        </SignedOut>
      </div>
    );
  }
  if (user !== null) {
    push("/teacher");
  }
};
export default Login;
