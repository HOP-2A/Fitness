"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <div>
            <SignedOut>
              <RedirectToWelcome />
            </SignedOut>
            <header className="fixed top-4 right-4 z-50">
              <SignedIn>
                <div className="flex items-center gap-3 bg-green-300 px-4 py-2 rounded-full shadow-lg ">
                  <UserButton />
                  <span className="text-sm text-blue-400 font-medium">
                    Profile
                  </span>
                </div>
              </SignedIn>
            </header>
          </div>

          <main className="flex-grow">{children}</main>

          <footer className="w-full py-4 bg-[#192126]">
            <div className="text-center text-white text-sm">
              © 2025 Kenomu · Learn today, lead tomorrow.
            </div>
          </footer>

          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}

const RedirectToWelcome = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/welcome");
  }, [router]);

  return null;
};
