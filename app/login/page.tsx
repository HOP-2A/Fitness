"use client";
import { SignInButton, SignedOut, useUser } from "@clerk/nextjs";

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
    push("/");
  }
  return <div> hi</div>;
};
export default Login;
