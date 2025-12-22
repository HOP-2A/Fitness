import { House, ListOrdered, Rocket, User } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 z-50 flex justify-between w-screen px-8 py-4 bg-[#192126] border-t border-[#3B434D]">
      <Link href="/" className="text-[#A3FFAB] hover:text-white transition-colors">
        <House />
      </Link>

      <div className="text-[#A3FFAB] hover:text-white transition-colors cursor-pointer">
        <Rocket />
      </div>

      <Link href="/leader" className="text-[#A3FFAB] hover:text-white transition-colors">
        <ListOrdered />
      </Link>

      <Link href="/user" className="text-[#A3FFAB] hover:text-white transition-colors">
        <User />
      </Link>
    </div>
  );
};
