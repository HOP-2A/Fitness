"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div>
            <header>
              <Button
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign-up
              </Button>

              <SignedOut>
                <SignInButton>Sign in</SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>

          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
