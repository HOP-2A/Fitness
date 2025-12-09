"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
  return <div> hi</div>;
};
export default Login;
